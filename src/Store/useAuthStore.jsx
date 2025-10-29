import { create } from "zustand";
import { axiosInstance } from"../Axios/axiosinc";
import {Toaster} from "react-hot-toast";
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

    checkAuth: async()=>{
        try {
            const response = await axiosInstance.get("/auth/checkauth")
            set({authUser: response.data})
             localStorage.setItem("authUser", JSON.stringify(response.data));
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
        set({isloggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",datas)
            set({authUser:res.data})
            localStorage.setItem("authUser", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
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
            set({authUser:res.data})
            localStorage.setItem("authUser", JSON.stringify(res.data));
            toast.success("Account Created Succesfully")
        } catch (error) {
            throw error;
        }
        finally{
            set({isSigningUp:false})
        }
    },

    Logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
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
  }
}))