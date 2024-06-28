import React from "react";
import LogOut from "../assets/LogOut.png"
import {useAuth} from './AuthProvider'
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  var auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = ()=>{
      navigate('/')
      auth.logout()
  }

  return (
    <div className="bg-gray-900 text-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center h-16">
        <div className="text-lg font-bold">Logo</div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">
          <span className="mr-3"></span>
          Dashboard
        </a>
      </nav>
      <div className="px-2 py-2 mt-auto">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700" onClick={handleLogout}>
          <span className="mr-3"><img src={LogOut} height={20} width={20}/></span>
           Logout
        </a>
      </div>
    </div>
  );
}

export default Sidebar;