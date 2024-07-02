import React from 'react';
import './admin.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../AuthProvider'
import LogOut from "../../assets/LogOut.png"

const Sidebar = () => {
  const navigate = useNavigate();
  var auth = useAuth()

  const handleLogout = ()=>{
      navigate('/')
      auth.logout()
  }

  return (
    <div className="sidebar bg-gray-900 text-white w-64 h-screen flex flex-col">
      <div className="menu-title">PAGES</div>
      <div>
      <div className="menu-item" onClick={() => navigate('/adminDashboard')}>
        <DashboardIcon className="menu-item-icon" />
        Dashboard
      </div>
      <div className="menu-item" onClick={() => navigate('/adminDashboard/addUsers')}>
        <PeopleIcon className="menu-item-icon" />
        Add Users
      </div>
      <div className="menu-item" onClick={() => navigate('/adminDashboard/viewUsers')}>
        <PeopleIcon className="menu-item-icon" />
        View Users
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
