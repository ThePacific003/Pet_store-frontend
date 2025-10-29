import React from 'react'
import PpNavbar from '../Components/PpNavBar'
import { Outlet } from 'react-router'

const PpLayout = () => {
  return (
    <div className="min-h-screen">
   <PpNavbar/>
   <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default PpLayout