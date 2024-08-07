import React from 'react';
import Sidebar from './sidebar.jsx';
import MainContent from './MainContent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from '../Setting/Settings';
import ChangePassword from '../Setting/ChangePassword';
import ChangeNumber from '../Setting/ChangeNumber';
//import ManageBills from './manageBills.jsx';
import History from './History.jsx';
import { BillsProvider } from './BillsContext.jsx';
import ManagerStats from './ManagerStats.jsx';
import ClaimDetails from './ClaimDetails.jsx';

import './manager.css';

const Dashboard = () => {
  localStorage.setItem('role','Manager')
  return (
    <div className="manager-dashboard" >
      <Sidebar />
      <div className="manager-main-content">
        <Routes>
          <Route path="/*" element={
            <BillsProvider>
              <MainContent />
          </BillsProvider>} />
          <Route path="/settings" element={<Settings role="manager"/>} />
          <Route path="/settings/ChangePassword" element={<ChangePassword />} />
          <Route path="/settings/ChangeNumber" element={<ChangeNumber/>} />
          <Route path='/managerstatistics' element={<ManagerStats/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path='/managerstatistics' element={<ManagerStats/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
