import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"

const ProtectedRoute=()=>{
    const user = useAuth();
    if(!user.token){
        return <Navigate to="/"/>
   
    }
    return <Outlet/>
}

export default ProtectedRoute