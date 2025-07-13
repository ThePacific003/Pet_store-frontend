import { createBrowserRouter, Outlet } from "react-router";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import App from "./App";

export const router = createBrowserRouter(
    [
        {
            path:'',
            element: <App/>,
            children: [
                
                        {
                            index: true,
                            element: <HomePage/> 
                        },
                        {
                            path:"/login",
                            element:<LoginPage/>
                        },
                        {
                            path:"/signup",
                            element:<SignupPage/>
                        }
                    ]
                }
            ]
)