import { create } from "zustand";
import { axiosInstance} from "../Axios/axiosinc";

export const usePaymentStore=create((set,get)=>({
        initiation:async(data)=>{
        try{
            const res=await axiosInstance.post("/payment/esewa/initiate",{orderId:data._id})
            return res;
        }
        catch(error){
            throw error
        }
    }
}))