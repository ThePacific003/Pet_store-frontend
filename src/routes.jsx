import { createBrowserRouter, Outlet, createRoutesFromElements, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import App from "./App";
import Layout from "./Layout/Layout";
import AboutUs from "./Pages/AboutUs";
import CategoriesPage from "./Pages/CategoriesPage";
import ShopPage from "./Pages/ShopPage";
import AdoptPage from "./Pages/AdoptPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="aboutus" element={<AboutUs/>}/>
            <Route path="categories" element={<CategoriesPage/>}/>
            <Route path="shop" element={<ShopPage/>}/>
            <Route path="adopt" element={<AdoptPage/>}/>
        </Route>

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        </>
    )


        
)