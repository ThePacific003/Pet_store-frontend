import React from 'react'
import { useChatStore } from '../Store/useChatStore'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'

const Messenger = () => {
  const { selectedUser } = useChatStore()

  // return (
  //   <div className="h-full w-full grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden">
  //     {/* Sidebar */}
  //     <Sidebar />

  //     {/* Main Chat Area */}
  //     <div className="flex flex-col h-full overflow-hidden">
  //       {selectedUser ? <ChatContainer /> : <NoChatSelected />}
  //     </div>
  //   </div>
  // )

   return (
    <div className=" fixed inset-0  grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden bg-[var(--c1)]">
      {/* Sidebar (non-scrollable) */}
      <div className=" h-full overflow-hidden">
        <Sidebar />
      </div>

      {/* Chat area (scrollable content) */}
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  )
}

export default Messenger