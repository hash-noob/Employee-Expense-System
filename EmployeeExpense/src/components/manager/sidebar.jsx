import React from "react";
import { useAuth } from '../AuthProvider';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import ManagerStats from "./ManagerStats";
import './manager.css';

const Sidebar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    auth.logout();
  };

  return (
    <div className="manager-sidebar">
      <div className="flex items-center justify-center h-16">
        <div className="text-lg font-bold">Logo</div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        <a onClick={() => navigate('/managerDashboard')} className="flex items-center px-2 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md">
          <DashboardIcon className="mr-3" />
          Dashboard
        </a>
        <a onClick={() => navigate('/managerDashboard/settings')} className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <SettingsIcon className="mr-3"/>
          Settings
        </a>
        <a onClick={() => navigate('/managerDashboard/history')} className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <HistoryIcon className="mr-3" />
          History
        </a>
        <a onClick={() => navigate('/managerDashboard/managerstatistics')} className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
          <BarChartIcon className="mr-3" />
          Statistics
        </a>
      </nav>
      <div className="px-2 py-2 mt-auto">
        <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700" onClick={handleLogout}>
          <LogoutIcon className="mr-3" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
