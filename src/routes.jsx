import { createBrowserRouter, Outlet, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import App from "./App";
import Layout from "./Layout/Layout";
import AboutUs from "./Pages/AboutUs";
import CategoriesPage from "./Pages/CategoriesPage";
import ShopPage from "./Pages/ShopPage";
import AdoptPage from "./Pages/AdoptPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { ProtectRoute } from "./utils/ProtectedRoute";
import Admin from "./Pages/Admin";
import AdminLayout from "./Layout/AdminLayout"
import AdminGetAllPets from "./Pages/Admin";
import GetAllPets from "./Pages/GetAllPets";
import AdminPets from "./Pages/AdminPets";
import AdminAccessories from "./Pages/AdminAccessories";
import AdminBreeds from "./Pages/AdminBreeds";
import GetAllAdoptionRequest from "./Pages/GetAllAdoptionRequest";
import Ppdashboard from "./Pages/ppdashboard";
import PpLayout from "./Layout/PpLayout";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailed from "./Pages/PaymentFailed";
import Adminorders from "./Pages/Adminorders"
import VerifyOtp from "./Pages/Verifyotp";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/'  element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />


        
        <Route element={(<ProtectRoute>
            <Layout/>
        </ProtectRoute>)}>
            <Route path="/home"  element={<HomePage/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/shop" element={<ShopPage/>}/>
            <Route path="/adopt" element={<AdoptPage/>}/>
        </Route>
            <Route 
    path="/provider-dashboard" 
    element={
      <ProtectRoute roles={["petProvider"]}>
        <PpLayout />
      </ProtectRoute>
    } 
  >
    <Route index element={<Ppdashboard/>}/>
    </Route>

            <Route path='/admin-dashboard' element={(<ProtectRoute><AdminLayout/></ProtectRoute>)}>
                <Route index element={<Admin/>}></Route>
                <Route path="adminpets" element={<AdminPets/>}/>
                <Route path="adminaccessories" element={<AdminAccessories/>}/>
                <Route path="breedprofile" element={<AdminBreeds/>}/>
                <Route path="getalladoption" element={<GetAllAdoptionRequest/>}/>
                <Route path="getallorders" element={<Adminorders/>}/>
            </Route>

        </>
    )


        
)