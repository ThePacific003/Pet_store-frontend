import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signup, isSigningUp } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: ''
  })

  const handleSubmit =async (e) => {
    e.preventDefault()
    if(!formData.fullname  || !formData.email || !formData.password){
      alert("Input all fields");
      return;
    }

    try {
      await signup(formData)
  }
  catch(error){
    alert(error.message || "Signup failed");
  }
  }
  const handleClick = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--c1)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
        style={{ backgroundColor: "var(--c2)" }}
      >
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: "var(--c5)" }}
        >
          Create Account
        </h2>

        {/* Fullname Input */}
        <div className="relative">
          <label
            htmlFor="fullname"
            className="absolute left-3 top-3"
            style={{ color: "var(--c3)" }}
          >
            <User size={20} />
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            style={{
              border: `1px solid var(--c4)`,
              color: "var(--c1)"
            }}
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute left-3 top-3"
            style={{ color: "var(--c3)" }}
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
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            className="w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2"
            style={{
              border: `1px solid var(--c4)`,
              color: "var(--c1)"
            }}
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute left-3 top-3"
            style={{ color: "var(--c3)" }}
          >
            <Lock size={20} />
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full pl-10 pr-10 py-2 rounded-xl focus:outline-none focus:ring-2"
            style={{
              border: `1px solid var(--c4)`,
              color: "var(--c1)"
            }}
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-3 top-2.5"
            style={{ color: "var(--c3)" }}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 font-semibold rounded-xl transition duration-300"
          style={{
            backgroundColor: "var(--c3)",
            color: "white"
          }}
        >
          {isSigningUp ? 'Creating...' : 'Create Account'}
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm" style={{ color: "var(--c5)" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold underline"
            style={{ color: "var(--c4)" }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
