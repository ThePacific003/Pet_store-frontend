import { RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import {router} from './routes'
import {Toaster} from 'react-hot-toast'

function App() {
  
  return (
    <>
    <RouterProvider router={router} />
     <Toaster position="top-right" reverseOrder={false} />
      
    </>
  )
}

export default App
