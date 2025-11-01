import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full w-full flex flex-1 flex-col items-center justify-center p-10 
                    bg-gradient-to-b from-[var(--c1)] via-[var(--c4)] to-[var(--c3)] 
                    text-[var(--c2)] select-none transition-all duration-300 ">
      <div className="max-w-md text-center space-y-6">
      

        {/* Title */}
        <h2 className="text-3xl font-bold tracking-wide text-[var(--c2)] drop-shadow-md">
           🐾 PetNest
        </h2>
      </div>
    </div>
  );
};

export default NoChatSelected;
