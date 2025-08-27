import { Eye, EyeOff, Lock, Mail, RollerCoaster, User, Stethoscope, PawPrint } from 'lucide-react'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.role) {
      alert('Please select a role.')
      return
    }
    signup(formData)
    toast.success("Signed up !!!")
    navigate("/")
  }

  const handleClick = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <div className="relative">
            <label htmlFor="fullname" className="absolute left-3 top-3 text-gray-400">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="absolute left-3 top-3 text-gray-400">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="absolute left-3 top-3 text-gray-400">
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
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="relative">
        <div>
  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Role</label>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <label
      className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
        formData.role === 'vet'
          ? 'border-purple-500 bg-purple-100'
          : 'border-gray-300'
      }`}
    >
      <input
        type="radio"
        name="role"
        value="vet"
        checked={formData.role === 'vet'}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="hidden"
      />
      <Stethoscope size={18} />
      <span>Vet</span>
    </label>

    <label
      className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
        formData.role === 'customer'
          ? 'border-purple-500 bg-purple-100'
          : 'border-gray-300'
      }`}
    >
      <input
        type="radio"
        name="role"
        value="customer"
        checked={formData.role === 'customer'}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="hidden"
      />
      <User size={18} />
      <span>Customer</span>
    </label>

    <label
      className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
        formData.role === 'petProvider'
          ? 'border-purple-500 bg-purple-100'
          : 'border-gray-300'
      }`}
    >
      <input
        type="radio"
        name="role"
        value="petProvider"
        checked={formData.role === 'petProvider'}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="hidden"
      />
      <PawPrint size={18} />
      <span>Pet Provider</span>
    </label>
  </div>
</div>

          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition duration-300"
          >
            {isSigningUp ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </>
  )
}

export default SignupPage
