import {create} from "zustand";
import { axiosInstance } from "../Axios/axiosinc";

export const useProductStore=create((set,get)=>({
    createOrder:async(itemType, category)=>{
        try{
            const response=await axiosInstance.get("/products",{
                params:{itemType,category}
            });
            return response.data

        }
        catch(error){
            throw error;
        }
    }
}))