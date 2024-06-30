// Dashboard.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CustomCard from './Card';
import './admin.css';
import { Routes, Route } from 'react-router-dom';
import AddUsers from './AddUsers';
import ClaimsBar from "./ClaimsBar";
import UserList from "./UserList";
import ActivityBar from './ActivityBar';
import { useEmployee } from './EmployeeContext';

const Dashboard = () => {
  const { employees } = useEmployee();
  const cardContents = [
    { title: "No of Users", count: employees.filter(emp => emp.role === 'user').length },
    { title: "No of Managers", count: employees.filter(emp => emp.role === 'manager').length },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="dashboard-cards">
              {cardContents.map((content, index) => (
                <CustomCard key={index} Content={content} />
              ))}
            </div>
          } />
          <Route path="addUsers" element={<AddUsers />} />
          <Route path="viewUsers" element={<UserList />} />
        </Routes>
      </div>
      <div style={{width:'30vw'}}>
        <Routes>
          <Route path="/" element={<ClaimsBar />} />
          <Route path="addUsers" element={<ActivityBar />} />
          <Route path="viewUsers" element={<ActivityBar />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
