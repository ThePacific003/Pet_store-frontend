import React,{useState} from 'react'
import { ArrowLeft } from 'lucide-react'
import CreateBreed from '../Components/CreateBreed'
import GetAllBreeds from './GetAllBreeds'

const AdminBreeds=()=>{
    const [buttonCicked, setButtonClicked] = useState(false);
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
      <span>Create Breed</span>
    </>
  )}
</button>
        {buttonCicked? <CreateBreed/> : <GetAllBreeds/>}
    </div>
  )
}
export default AdminBreeds