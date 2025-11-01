import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../Store/useChatStore'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
// import MessageSkeleton from './Skeletions/MessageSkeleton'
import { useAuthStore } from '../Store/useAuthStore'
import { formatMessageTime } from '../lib/timeFormatter'

const ChatContainer = () => {
  const { authUser } = useAuthStore()
  const {
    isLoadingMessages,
    selectedUser,
    messages,
    getMsg,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    console.log("Chat container ko useEffect chaliraxa");
    console.log(selectedUser);
    
    
    getMsg(selectedUser._id)
    subscribeToMessages()
    return () => unsubscribeToMessages()
  }, [getMsg, selectedUser, subscribeToMessages, unsubscribeToMessages])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (isLoadingMessages)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    )

//   return (
//     <div className="flex flex-col h-full">
//       <ChatHeader />

//       {/* Messages Area */}
//       <div className="flex-1 overflow-auto px-4 py-3 space-y-4 bg-base-100">
//         {messages.map((message) => (
//           <div key={message._id} className="flex flex-col">
//             <div
//               className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'
//                 }`}
//             >
//               {/* Avatar */}
//               {message.senderId !== authUser._id && (
//                 <div className="chat-image avatar">
//                   <div className="size-10 rounded-full border shadow-md">
//                     <img src={selectedUser.profilePic} alt="profilePic" />
//                   </div>
//                 </div>
//               )}

//               {/* Message Body */}
//               <div className="flex flex-col max-w-[75%]">
//                 {/* Timestamp */}
//                 <span
//                   className={`text-xs mb-1 opacity-70 ${message.senderId === authUser._id
//                       ? 'self-end text-primary-content/70'
//                       : 'self-start text-base-content/70'
//                     }`}
//                 >
//                   {formatMessageTime(message.createdAt)}
//                 </span>

//                 {/* Bubble */}
//                 <div
//                   className={`chat-bubble rounded-2xl px-4 py-2 shadow-md transition-transform duration-200 hover:scale-[1.02]
//                     ${message.senderId === authUser._id
//                       ? 'bg-primary text-primary-content'
//                       : 'bg-base-200 text-base-content'
//                     }
//                   `}
//                 >
//                   {message.image && (
//                     <img
//                       src={message.image}
//                       alt="Attachment"
//                       className="sm:max-w-[220px] rounded-lg mb-2 shadow"
//                     />
//                   )}
//                   {message.text && <p className="leading-relaxed">{message.text}</p>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Scroll anchor */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="border-t bg-base-100 px-3 py-2 shadow-inner">
//         <MessageInput />
//       </div>
//     </div>
//   )
// }


return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[var(--c1)] via-[var(--c4)] to-[var(--c3)] text-[var(--c2)]">
      <div className="sticky top-24 z-20 bg-[var(--c1)] shadow-md">
    <ChatHeader />
  </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--c2)]/40 scrollbar-track-[var(--c1)]">
        {messages.map((message) => {
          const isMine = message.senderId === authUser._id
          return (
            <div
              key={message._id}
              className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
            >
              {/* Timestamp */}
              <span
                className={`text-xs mb-1 ${isMine ? 'text-[var(--c2)]/70' : 'text-[var(--c2)]/50'}`}
              >
                {formatMessageTime(message.createdAt)}
              </span>

              {/* Message bubble */}
              <div
                className={`relative max-w-[70%] rounded-2xl px-4 py-2 shadow-md transition-all duration-200
                  ${isMine
                    ? 'bg-[var(--c2)] text-[var(--c1)] rounded-br-none'
                    : 'bg-[var(--c1)]/60 text-[var(--c2)] border border-[var(--c2)]/20 rounded-bl-none'
                  }
                hover:scale-[1.02]`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[220px] rounded-lg mb-2 shadow-md"
                  />
                )}
                {message.text && (
                  <p className="leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
                )}

                {/* Subtle tail effect */}
                <span
                  className={`absolute bottom-0 w-3 h-3 transform rotate-45
                    ${isMine
                      ? 'right-0 translate-x-1/2 bg-[var(--c2)]'
                      : 'left-0 -translate-x-1/2 bg-[var(--c1)]/60 border-l border-b border-[var(--c2)]/20'
                    }`}
                />
              </div>
            </div>
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--c5)] bg-[var(--c1)] px-3 py-3 shadow-inner">
        <MessageInput />
      </div>
    </div>
  )
}
export default ChatContainer