import React, { useEffect, useState } from 'react'
import { useChatStore } from '../Store/useChatStore'
import { Users, Menu, X } from 'lucide-react'
import { useAuthStore } from '../Store/useAuthStore'

const Sidebar = () => {
  const { userss, isLoadinUsers, sidebar, selecteduser, setSelectedUser } = useChatStore()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    sidebar()
  }, [sidebar])

  const filteredUsers = Array.isArray(userss) ? userss : []

  if (isLoadinUsers) return <SidebarSkeleton />

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-10 left-4 z-50 p-2 bg-base-100 rounded-lg shadow-md"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar container */}
      <aside className={`
        bg-base-100 border-r border-base-300 h-full fixed md:relative z-40 transition-transform duration-300
        top-16 md:top-0
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:flex md:flex-col w-72 md:w-72
      `}>
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className='size-6' />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
        </div>


        {/* Users list */}
        <div className="overflow-y-auto w-full py-3 px-2 md:px-5 flex-1">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => { setSelectedUser(user); setMenuOpen(false) }}
              className={`
                w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors rounded-lg
                ${selecteduser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || '/avatar.png'}
                  alt={user.fullname}
                  className='size-12 object-cover rounded-full'
                />
              </div>

              {/* User info for larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullname}</div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {menuOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setMenuOpen(false)} />}
    </>
  )
}

export default Sidebar