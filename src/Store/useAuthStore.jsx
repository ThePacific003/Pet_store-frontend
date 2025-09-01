import { create } from "zustand";
import { axiosInstance } from"../Axios/axiosinc";
import toast from "react-hot-toast";
export const useAuthStore = create((set,get)=>({
    authUser: null,
    islogingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const response = await axiosInstance.get("/auth/checkauth")
            set({authUser: response.data})
            console.log(authUser);
            
        } catch (error) {
            set({authUser:null})
            console.log(authUser);
            
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    login: async(datas)=>{
        try {
            set({isloggingIn:true})
            const res = await axiosInstance.post("/auth/login",datas)
            set({authUser:res.data})
            return res.data
            toast.success("Login Succesfull")
        } catch (error) {
            set({isloggingIn:false});
            toast.error(error.response.data.message)
        }
        finally{
            set({isloggingIn:false})
        }
    },

    signup: async(datas)=>{
        try {
            set({isSigningUp:true})
            const res = await axiosInstance.post("/auth/signup",datas)
            set({authUser:res.data})
            toast.success("Account Created Succesfully")
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    Logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            toast.success("Logout Succesfull")
            set({authUser:null})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}))