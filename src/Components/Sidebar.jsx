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

  // return (
  //   <>
  //     {/* Mobile menu toggle button */}
  //     <button
  //       onClick={() => setMenuOpen(!menuOpen)}
  //       className="md:hidden fixed top-10 left-4 z-50 p-2 bg-base-100 rounded-lg shadow-md"
  //     >
  //       {menuOpen ? <X size={24} /> : <Menu size={24} />}
  //     </button>

  //     {/* Sidebar container */}
  //     <aside className={`
  //       bg-base-100 border-r border-base-300 h-full fixed md:relative z-40 transition-transform duration-300
  //       top-16 md:top-0
  //       ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
  //       md:translate-x-0 md:flex md:flex-col w-72 md:w-72
  //     `}>
       


  //       {/* Users list */}
  //       <div className="overflow-y-auto w-full py-3 px-2 md:px-5 flex-1">
  //         {filteredUsers.map((user) => (
  //           <button
  //             key={user._id}
  //             onClick={() => { setSelectedUser(user); setMenuOpen(false) }}
  //             className={`
  //               w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors rounded-lg
  //               ${selecteduser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}
  //             `}
  //           >
  //             <div className="relative mx-auto lg:mx-0">
  //               <img
  //                 src={user.profilePic || '/avatar.png'}
  //                 alt={user.fullname}
  //                 className='size-12 object-cover rounded-full'
  //               />
  //             </div>

  //             {/* User info for larger screens */}
  //             <div className="hidden lg:block text-left min-w-0">
  //               <div className="font-medium truncate">{user.fullname}</div>
  //             </div>
  //           </button>
  //         ))}
  //       </div>
  //     </aside>

  //     {/* Overlay for mobile when sidebar is open */}
  //     {menuOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setMenuOpen(false)} />}
  //   </>
  // )



   return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-10 left-4 z-50 p-2 bg-[var(--c2)] text-[var(--c1)] rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar container */}
      <aside
        className={`
          fixed md:relative top-16 md:top-0 h-full md:h-screen
          transition-transform duration-300 z-40
          w-72 bg-gradient-to-b from-[var(--c1)] via-[var(--c4)] to-[var(--c3)]
          text-white border-r border-[var(--c5)] shadow-2xl
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:flex md:flex-col
        `}
      >
        {/* Header */}
        {/* <div className="p-4 text-center border-b border-[var(--c5)] bg-[var(--c1)] shadow-inner">
          <h2 className="text-xl font-semibold tracking-wide text-[var(--c2)]">Chats</h2>
        </div> */}

        {/* User list */}
        <div className="mt-24 flex-1 overflow-y-auto px-3 py-4 space-y-2 scrollbar-thin scrollbar-thumb-[var(--c2)] scrollbar-track-[var(--c3)]">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                setSelectedUser(user)
                setMenuOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl
                bg-white/5 hover:bg-[var(--c2)]/20 transition-all
                hover:scale-[1.02] group relative
                ${selecteduser?._id === user._id ? 'bg-[var(--c2)]/30 ring-1 ring-[var(--c2)]' : ''}
              `}
            >
              <div className="relative">
                <img
                  src={user.profilePic || '/avatar.png'}
                  alt={user.fullname}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--c2)] shadow-md group-hover:shadow-[0_0_10px_var(--c2)] transition-all"
                />
                <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--c1)]"></span>
              </div>

              <div className="flex flex-col text-left truncate">
                <span className="font-medium text-[var(--c2)] truncate">{user.fullname}</span>
                <span className="text-sm text-[var(--c2)]/70">Tap to chat</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="p-3 text-center text-xs text-[var(--c2)]/70 border-t border-[var(--c5)] bg-[var(--c1)]">
          <p>Made with ❤️ by Prashant</p>
        </div> */}
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />

      )
}
</>
   )
  }

export default Sidebar