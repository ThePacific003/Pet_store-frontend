import React, { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router";

const VerifyOtp = () => {
    const navigate=useNavigate()
  const [otp, setOtp] = useState("");
  const { verifyOtp } = useAuthStore();
  const email = localStorage.getItem("pendingEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email not found. Please sign up again.");
   await verifyOtp(email, otp); // assume store returns true/false
  
      // ✅ redirect user to home/dashboard/login
      navigate("/"); // redirect to homepage or dashboard
      localStorage.removeItem("pendingEmail"); // cleanup
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
