import { create } from "zustand";
import { axiosInstance} from "../Axios/axiosinc";
import {useAuthStore} from "./useAuthStore"

export const useChatStore=create((set,get)=>({
    userss: [],
    messages: [],
    selectedUser: null,
    setSelectedUser: (user)=> set({selectedUser: user}),

    sidebar:async()=>{
        try{
            const res =await axiosInstance.get(`message/users`)
            // return res.data
            set({userss: res.data})
            return 
        }
        catch(error){
            throw error
        }
    },
    getMsg:async(id)=>{
        try{
            const res=await axiosInstance.get(`message/${id}`)
            set({messages: res.data})
        }
        catch(error){
            throw error
        }
    },
    sendMsg:async(messageData) => {
            const {messages, selectedUser} = get()
            try {
                const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
                set({messages: [...messages, res.data]})
            }
        catch(error){
            throw error
        }
    },

    subscribeToMessages : ()=>{
            const{selectedUser} = get()
            
            if(!selectedUser) return
            
            const socket = useAuthStore.getState().socket
            socket.on("newMessage", (newMessage)=>{
                if(newMessage.senderId !== selectedUser._id) return
                set({
                    messages: [...get().messages, newMessage]
                })
            })
        },


        unsubscribeToMessages: ()=>{
            const socket = useAuthStore.getState().socket
            socket.off("newMessage")
        },

        setSelectedUser : (selectedUser)=> set({selectedUser}
        )
    
}))