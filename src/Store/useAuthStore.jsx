import { create } from "zustand";
import { axiosInstance } from"../Axios/axiosinc";
import {toast} from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set,get)=>({
    authUser: (() => {
  try {
    const user = localStorage.getItem("authUser");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch {
    return null;
  }
})() ,
    islogingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    selectedUser: null,
    socket: null,

    checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/checkauth")
          set({ authUser: res.data })
          if (!get().socket) {
            get().connectSocket()
          }
        } catch (error) {
          console.log("error in checkauth: ", error)
          set({ authUser: null })
        } finally {
          set({ isCheckingAuth: false })
        }
      },

    login: async(datas)=>{
        set({isloggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",datas)
            set({authUser:res.data})
            get().disconnectSocket()
            get().connectSocket()
            localStorage.setItem("authUser", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
        finally{
            set({isloggingIn:false})
        }
    },

    signup: async(datas)=>{
        try {
            set({isSigningUp:true})
            const res = await axiosInstance.post("/auth/signup",datas)
            // set({authUser:res.data})
            alert(res.data.message );
            // localStorage.setItem("authUser", JSON.stringify(res.data));

            // You can store the email temporarily to verify later
    localStorage.setItem("pendingEmail", datas.email);

    // Optionally navigate to OTP verification page
    window.location.href = "/verify-otp";

        } catch (error) {
            if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      // Generic error fallback
      throw new Error("Something went wrong. Please try again.");
    }
        }
        finally{
            set({isSigningUp:false})
        }
    },

    verifyOtp: async (email, otp) => {
  try {
    set({ isVerifyingOtp: true });

    const res = await axiosInstance.post("/auth/verify-otp", { email, otp });

    // ✅ Now user is verified, store auth data
    set({ authUser: res.data });
    localStorage.setItem("authUser", JSON.stringify(res.data));

    alert("Email verified successfully!");
    window.location.href = "/"; // or dashboard/home
  } catch (error) {
    toast.error(error.response?.data?.message || "OTP verification failed");
  } finally {
    set({ isVerifyingOtp: false });
  }
},



    Logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            get().disconnectSocket()
            set({ authUser: null, socket: null })
            localStorage.removeItem("authUser");
        } catch (error) {
           throw error
        }
    },

    upgrade:async()=>{
        try{
            const res=await axiosInstance.post("/auth/upgradeprovider")
            set({authUser: res.data})
            localStorage.setItem("authUser", JSON.stringify(res.data));
            return res.data
        }
        catch(error){
            set({authUser:null})
            throw error
        }
    },
    downgrade: async () => {
    try {
      const res = await axiosInstance.post("/auth/downgrade");
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      throw error;
    }
  },
   connectSocket: () => {
        const { authUser, socket } = get()
        if (!authUser || socket) return

        const newSocket = io(BASE_URL, {
          auth: { userId: authUser._id }, // use auth instead of query
          transports: ["websocket"],
          withCredentials: true,
        })

        newSocket.on("connect", () => {
          console.log("✅ Socket connected:", newSocket.id)
        })
        newSocket.on("connect_error", (err) => {
          console.error("❌ Socket connect error:", err.message)
          toast.error("Socket connection failed: " + err.message)
        })

        set({ socket: newSocket })
      },

      disconnectSocket: () => {
        const s = get().socket
        if (!s) {
          set({ socket: null, onlineUsers: [] })
          return
        }
        try {
          s.off("getOnlineUsers")
          s.off("connect")
          s.off("connect_error")
          s.disconnect()
        } catch (e) {
          console.warn("Error while disconnecting socket", e)
        } finally {
          set({ socket: null, onlineUsers: [] })
        }
      },
}))