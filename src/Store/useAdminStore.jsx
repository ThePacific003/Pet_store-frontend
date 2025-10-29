import toast from "react-hot-toast";
import {create} from "zustand";
import { axiosInstance } from "../Axios/axiosinc";

export const useAdminStore=create((set,get)=>({

    createBreed:async(datas)=>{
        try{
            const response=await axiosInstance.post("/breedprofile/createbreed",datas);
            return response.data;
            toast.success("Login successful");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },

    getAllPets:async()=>{
        try{
            const response=await axiosInstance.post("/pet/");
            return response.data;
            
            toast.success("data fetched");
        }
        catch (error){
            toast.error(error.response.data.message);
        }
    },

    createPet:async(datas)=>{
        try{
            const response=await axiosInstance.post("/pet/create",datas);
            return response.data;
            toast.success("pet created");

        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },

    restock:async(pet,quantityToAdd)=>{
        try{
            if(!quantityToAdd || quantityToAdd<=0){
                throw new Error("Quantity must be positive number");
            }
           const res= await axiosInstance.post(`/pet/restock/${pet._id}`,{quantityToAdd});
            return res.data;
        }
        catch(error){
            throw error;
        }
    },

    update:async(pet,datas)=>{
        try{
            const response=await axiosInstance.put(`/pet/update/${pet._id}`, datas);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    createAccessory: async(datas)=>{
        try{
            const response=await axiosInstance.post("/accessory/createaccessory",datas);
            return response.data;

        }
        catch(error){
            throw error
        }
    },

    getAllAcc:async()=>{
         try{
            const response=await axiosInstance.get("/accessory/");
            return response.data;
            
            toast.success("data fetched");
        }
        catch (error){
            throw error;
        }
    },

    restockAcc:async(acc,quantityToAdd)=>{
         try{
            if(!quantityToAdd || quantityToAdd<=0){
                throw new Error("Quantity must be positive number");
            }
           const res= await axiosInstance.post(`/accessory/restock/${acc._id}`,{quantityToAdd});
            return res.data;
        }
        catch(error){
            throw error;
        }
    },
    updateacc:async(acc,datas)=>{
        try{
            const response=await axiosInstance.put(`/accessory/update/${acc._id}`, datas);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },

    getAllBreed:async()=>{
        try{
            const response=await axiosInstance.get("/breedprofile/");
            return response.data;
            
        }
        catch (error){
            throw error;
        }
    },
    updateBreed:async(breed)=>{
         try{
            const response=await axiosInstance.put(`/breedprofile/update/${breed._id}`, datas);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    adooption:async()=>{
        try{
            const response=await axiosInstance.get(`/adoption/alladoptions`)
            return response.data;
        }
        catch(error){
            throw error
        }
    }

}))