// Navbar.jsx
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const PpNavbar = () => {
      const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {authUser,downgrade}=useAuthStore();

    const handleLogout = async () => {
try {

       const storedUser = (() => {
  const userStr = localStorage.getItem("authUser");
  return userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;
})();
      console.log(storedUser.role);
      if (!storedUser || storedUser.role !== "petProvider") {
      return alert("Only petprovider can downgrade to customers.");
    }
       await downgrade();
      // update user in your store
      // navigate to provider dashboard
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upgrade");
    }
  };
  return (
    <nav
      className="flex items-center justify-between px-6 py-4 shadow-md"
      style={{ backgroundColor: "var(--c1)", color: "var(--c2)" }}
    >
      <h1 className="text-xl font-bold">🐾 PetNest</h1>
      <div className="flex gap-6">
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

      </div>
    </nav>
  );
};

export default PpNavbar;
