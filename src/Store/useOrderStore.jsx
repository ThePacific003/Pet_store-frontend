import { create } from "zustand";
import { axiosInstance} from "../Axios/axiosinc";
import axios from "axios";
import { Axis3D } from "lucide-react";

export const useOrderStore=create((set,get)=>({
    order:async(data)=>{
        try{
            const res=await axiosInstance.post("order",data);
            return res;
        }
        catch(error){
            throw error;
        }
    },
    getmyorder:async()=>{
        try {
            const res=await axiosInstance.get("order/getmyorder",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            return res;
        }
        catch(error){
            throw error;
        }
    },
    
    cancelmyorder:async(orderId)=>{
        try{
            await axiosInstance.put(`order/cancel/${orderId}`)
        }
        catch(error){
            throw error;
        }
    },
    getallorder:async()=>{
        try{
            const res=await axiosInstance.get(`order/allorders`);
            return res;
        }
        catch(error){
            throw error;
        }
    },
    update:async(id,newstatus)=>{
        try{
            const res=await axiosInstance.put(`order/updatestatus/${id}`,{
                orderStatus:newstatus
            })
            return res;
        }
        catch(error){
            throw error;
        }
    },
    deleteorder: async(id)=>{
        try{
        await axiosInstance.delete(`order/deleteorder/${id}`);
        }
        catch(error){
        throw error
        }
    },
    find:async(search)=>{
        try{
            const res=await axiosInstance.get(`order/search?search=${search}`)
            return res;
        }
        catch(error){
            throw error
        }
    }

}))