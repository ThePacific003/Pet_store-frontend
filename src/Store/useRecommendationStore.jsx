import toast from "react-hot-toast";
import {create} from "zustand";
import { axiosInstance } from "../Axios/axiosinc";

export const useRecommendationStore=create((set,get)=>({
    recommendations:[],


    recommend:async(datas)=>{
         try {            
            const response = await axiosInstance.post("/breedprofile/recommendation",datas);
            set({recommendations: response.data.matches });
            const recs = get().recommendations
            console.log(recs);
        
            
            // return response
           
            
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            
        }
    }
}))
