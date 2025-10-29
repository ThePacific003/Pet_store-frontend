import React,{useState} from 'react'
import { useAdminStore } from '../store/useAdminStore'
import { ArrowLeft } from 'lucide-react'
import CreateAccessory from '../Components/CreateAccessories'
import GetAllAccessories from './GetAllAccessories'


  const AdminAccessories = () => {
  const [buttonCicked, setButtonClicked] = useState(false)
    const {createPet} = useAdminStore()
    const handleClick = async() =>{
        setButtonClicked(!buttonCicked)
    }
  return (
    <div>
        <button
  onClick={handleClick}
  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-md
             bg-[var(--c2)] text-[var(--c5)] hover:bg-[var(--c4)] hover:text-white 
             transition transform hover:scale-105"
>
  {buttonCicked ? (
    <>
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </>
  ) : (
    <>
      <span className="text-2xl">+</span>
      <span>Add Accessory</span>
    </>
  )}
</button>
        {buttonCicked? <CreateAccessory/> : <GetAllAccessories/>}
    </div>
  )
  }
export default AdminAccessories
