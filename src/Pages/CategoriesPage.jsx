import React from 'react'
import { useChatStore } from '../Store/useChatStore'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'

const Messenger = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex flex-col h-full overflow-hidden">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  )
}

export default Messenger