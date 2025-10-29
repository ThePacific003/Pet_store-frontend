import { Navigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";

export function ProtectRoute({children,roles}) {
const {authUser} = useAuthStore()

if (!authUser) {
    return <Navigate to="/" replace/>; 
  }
if (roles && !roles.includes(authUser.role)) {
    return <Navigate to="/home" replace />;
  }
// return authUser.role!=="admin" ? <Navigate to="/home" replace/> : children;


  // if (adminOnly && authUser.role !== "admin") {
  //   return <Navigate to="/home" replace />;
  // }
  return children
}