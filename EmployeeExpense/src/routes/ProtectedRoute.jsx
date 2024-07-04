import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"

const ProtectedRoute=()=>{
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}

export default ProtectedRoute