import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";



const Navbar = () => {

  const [open, setOpen] = useState(false);
  const { authUser, Logout, upgrade } = useAuthStore();
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {

      const storedUser = (() => {
        const userStr = localStorage.getItem("authUser");
        return userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
      })();

      console.log(storedUser);
      if (!storedUser || storedUser.role !== "customer") {
        return alert("Only customers can upgrade to pet providers.");
      }
      await upgrade();
      navigate("/provider-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upgrade");
    }
  };


  const handleLogout = () => {
    try {
      Logout();
      navigate("/");
    }
    catch (error) {
      alert(error.response?.data?.message || "Logout failed");
    }
  }

  return (
    <nav className="p-3 sticky top-0 z-50 bg-[var(--c1)] text-white shadow-md relative">
      <div className=" max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo / Brand */}
        <NavLink to='/home'>
          <div className="text-2xl font-bold tracking-wide text-[var(--c2)]">
            🐾 PetNest
          </div>
        </NavLink>

        {/* Navbar Links */}
        <ul className=" flex gap-8 font-medium items-center">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                ` transition ${isActive ? "p-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] " : "p-2 text-white"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                ` transition ${isActive ? "p-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] " : "p-2 text-white"
                }`
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adopt"
              className={({ isActive }) =>
                ` transition ${isActive ? "p-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] " : "p-2 text-white"
                }`
              }
            >
              Adopt
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                ` transition ${isActive ? "p-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] " : "p-2 text-white"
                }`
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              className={({ isActive }) =>
                ` transition ${isActive ? "p-2 rounded-lg bg-[var(--c2)] text-[var(--c5)] " : "p-2 text-white"
                }`
              }
            >
              About Us
            </NavLink>
          </li>



          {/* User Profile Dropdown */}

          {authUser && (
            <li className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-[var(--c2)] transition"
              >
                <img
                  src={authUser.profilePic || "https://i.pravatar.cc/100"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-lg z-50">
                  {/* User Info */}
                  <div className="p-4 border-b flex items-center gap-3">
                    <img
                      src={authUser.profilePic || "https://i.pravatar.cc/100"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border"
                    />
                    <div>
                      <h4 className="font-semibold">{authUser.fullname}</h4>
                      <p className="text-sm text-gray-600">{authUser.email}</p>
                      <p className="text-xs text-gray-500 italic">
                        {authUser.role}
                      </p>
                    </div>
                  </div>
                  {/* Register as Pet Provider */}
                  <button
                    onClick={handleUpgrade}
                    className="flex items-center gap-2 w-full p-3 hover:bg-gray-100 transition"
                  >
                    <span>Register as Pet Provider</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full p-3 hover:bg-gray-100 transition rounded-b-xl"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </li>
          )}



        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
