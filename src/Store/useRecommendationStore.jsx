import toast from "react-hot-toast";
import {create} from "zustand";
import { axiosInstance } from "../Axios/axiosinc";

export const useRecommendationStore=create((set,get)=>({
    recommend:async(datas)=>{
         try {
            console.log("hiii");
            
            const response = await axiosInstance.get("/breedprofile/recommendation",datas);
            console.log("response");
            
            // return response
           
            
        } catch (error) {
            toast.error(error.message);
        }
    }
}))
