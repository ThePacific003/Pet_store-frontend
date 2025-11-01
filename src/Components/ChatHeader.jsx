import { Trash, X } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
 
const ChatHeader = () => {
    const { selectedUser, setSelectedUser, deleteChat } = useChatStore();

    return (
        <div className="p-2.5 border-b border-base-300 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullname} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullname}</h3>                        
                    </div>
                </div>

                {/* Close button */}
                <div className=" flex gap-5">


                    <button onClick={()=>deleteChat(selectedUser._id)} className="cursor-pointer hover:bg-gray-200">
                        <Trash />
                    </button>


                    <button onClick={() => setSelectedUser(null)} className="cursor-pointer hover:bg-gray-200">
                        <X />
                    </button>

                </div>
            </div>
        </div>
    );
};
export default ChatHeader;