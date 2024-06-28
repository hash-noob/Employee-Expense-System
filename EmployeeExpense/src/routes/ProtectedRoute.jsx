import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"

const ProtectedRoute=()=>{
    const token = useAuth();
    if(!token){
        console.log("heelo")
        return <Navigate to="/"/>
    }
    return <Outlet/>
}

export default ProtectedRoute