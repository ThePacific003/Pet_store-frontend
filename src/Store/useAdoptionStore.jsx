import { create } from "zustand";
import { axiosInstance } from"../Axios/axiosinc";

export const useAdoptionStore=create((set,get)=>({
    adoptreq:async(petId,message)=>{
        try{
            const res=await axiosInstance.post("/adoption/apply",{petId,message});
           return res.data;
           
        }
        catch(error){
            throw error;
        }
    },
    adoptablePets:async()=>{
        try{
            const res=await axiosInstance.get("/adoption/adopt")
            return res.data;
        }
        catch(error){
            throw error;
        }
    },
     myRequests: async () => {
    try {
      const res = await axiosInstance.get("/adoption/getmyreq");
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  cancelRequest: async (id) => {
    try {
      const res = await axiosInstance.put(`/adoption/cancel/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }, 

  providerreq:async()=>{
    try{
      const response=await axiosInstance.get("adoption/getadoptrequest");
      return response.data;
    }
    catch(error){
      throw error
    }
  },

  update:async(id,newStatus)=>{
    try{
      const res=await axiosInstance.put(`/adoption/updatestatus/${id}`,{newStatus})
      const updated=res.data

      set((state) => ({
      requests: state.requests
        ? state.requests.map((r) => (r._id === id ? updatedAdoption : r))
        : [updated], // if no requests array yet
    }));

     // Update localStorage (if persisting requests there)
    const storedRequests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
    const updatedRequests = storedRequests.map((r) =>
      r._id === id ? updated : r
    );
    localStorage.setItem("adoptionRequests", JSON.stringify(updatedRequests));

    return updated;
    }
    catch(error){
      throw error
    }
  },
  deletebypp:async(id)=>{
    try{
      await axiosInstance.delete(`/adoption/delete/${id}`);
    }
    catch(error){
      throw error;
    }
  }
}))