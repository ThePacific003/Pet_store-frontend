import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--c1)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide text-[var(--c2)]">
          PetNest
        </div>

        {/* Navbar Links */}
        <ul className="flex gap-8 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[var(--c2)] transition ${
                isActive ? "text-[var(--c2)] underline" : "text-white"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-[var(--c2)] transition ${
                isActive ? "text-[var(--c2)] underline" : "text-white"
              }`
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/adopt"
            className={({ isActive }) =>
              `hover:text-[var(--c2)] transition ${
                isActive ? "text-[var(--c2)] underline" : "text-white"
              }`
            }
          >
            Adopt
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `hover:text-[var(--c2)] transition ${
                isActive ? "text-[var(--c2)] underline" : "text-white"
              }`
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              `hover:text-[var(--c2)] transition ${
                isActive ? "text-[var(--c2)] underline" : "text-white"
              }`
            }
          >
            About Us
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
