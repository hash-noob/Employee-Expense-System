import React from 'react';
import './admin.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
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
      {/* <div className="menu-item">
        <StoreIcon className="menu-item-icon" />
        E-Commerce
      </div> */}
      <div className="menu-item" onClick={() => navigate('/adminDashboard/addUsers')}>
        <PeopleIcon className="menu-item-icon" />
        Add Users
      </div>
      <div className="menu-item" onClick={() => navigate('/adminDashboard/viewUsers')}>
        <PeopleIcon className="menu-item-icon" />
        View Users
      </div>
      {/* <div className="menu-item">
        <AccountBalanceIcon className="menu-item-icon" />
        Finance
      </div>
      <div className="menu-item">
        <WorkIcon className="menu-item-icon" />
        Job Board
      </div>
      <div className="menu-item">
        <AssignmentIcon className="menu-item-icon" />
        Tasks
      </div>
      <div className="menu-item">
        <MailIcon className="menu-item-icon" />
        Messages
      </div>
      <div className="menu-item">
        <MailIcon className="menu-item-icon" />
        Inbox
      </div>
      <div className="menu-item">
        <CalendarTodayIcon className="menu-item-icon" />
        Calendar
      </div>
      <div className="menu-item">
        <CampaignIcon className="menu-item-icon" />
        Campaigns
      </div> */}
      <div className="menu-item" >
        <SettingsIcon className="menu-item-icon" />
        Settings
      </div>
      </div>
      <div className="px-2 py-2 mt-auto">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700" onClick={handleLogout}>
          <span className="mr-3"><img src={LogOut} height={20} width={20}/></span>
           Logout
        </a>
      </div>
      {/* <div className="menu-item">
        <BuildIcon className="menu-item-icon" />
        Utility
      </div> */}
    </div>
  );
};

export default Sidebar;
