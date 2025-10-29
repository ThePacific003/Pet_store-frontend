import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAuthStore } from '../Store/useAuthStore';

const AdminNav = () => {
const { Logout } = useAuthStore();
const navigate=useNavigate()
   const handleLogout=()=>{
      try{
         Logout();
        navigate("/");
      }
      catch(error){
        alert(error.response?.data?.message || "Logout failed");
      }
    }
  return (
    <div className="flex min-h-screen"> 
      {/* Sidebar */}
      <aside className="w-1/4 max-w-[280px] min-w-[220px] bg-[var(--c1)] text-white flex flex-col p-4 h-screen sticky top-0">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold mb-8 text-center text-[var(--c2)]">
          <NavLink to="/admin-dashboard">
          🐾 PetNest
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 flex-1">
          <button className="p-3 rounded-lg hover:bg-[var(--c2)] hover:text-[var(--c5)] transition">
          <NavLink
            to="adminpets"
            className={({ isActive }) =>
              ` transition ${
                isActive ? "p-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] transition" : "text-white"
              }`
            }
          >
            Get All Pets
          </NavLink>
          </button>

          <button className="p-3 rounded-lg hover:bg-[var(--c2)] hover:text-[var(--c5)] transition">
            <NavLink
            to="adminaccessories"
            className={({ isActive }) =>
              ` transition ${
                isActive ? "p-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] transition" : "text-white"
              }`
            }
          >
            Get All Accessories
            </NavLink>
          </button>
          
          <button className="p-3 rounded-lg hover:bg-[var(--c2)] hover:text-[var(--c5)] transition">
            <NavLink
            to="getallorders"
            className={({ isActive }) =>
              ` transition ${
                isActive ? "p-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] transition" : "text-white"
              }`
            }
          >

            Get All Orders
            </NavLink>
          </button>
          
          <button className="p-3 rounded-lg hover:bg-[var(--c2)] hover:text-[var(--c5)] transition">
             <NavLink
            to="breedprofile"
            className={({ isActive }) =>
              ` transition ${
                isActive ? "p-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] transition" : "text-white"
              }`
            }
          >
            Get All Breed Profile
            </NavLink>
          </button>
          <button className="p-3 rounded-lg hover:bg-[var(--c2)] hover:text-[var(--c5)] transition">
            <NavLink
            to="getalladoption"
            className={({ isActive }) =>
              ` transition ${
                isActive ? "p-3 rounded-lg bg-[var(--c2)] text-[var(--c5)] transition" : "text-white"
              }`
            }
          >
            Get All Adoption Request
            </NavLink>
          </button>
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} className="p-3 rounded-lg hover:bg-[var(--c3)] mt-auto transition">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminNav
