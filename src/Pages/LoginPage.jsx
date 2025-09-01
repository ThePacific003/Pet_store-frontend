import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore(); // get login function from store

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(formData); // call login function
      toast.success("Logged in successfully!");
      navigate("/"); // redirect to home page
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleClick = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-500 to-blue-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login
        </h2>

        {/* Email Input */}
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute left-3 top-3 text-gray-400"
          >
            <Mail size={20} />
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute left-3 top-3 text-gray-400"
          >
            <Lock size={20} />
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-300"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
