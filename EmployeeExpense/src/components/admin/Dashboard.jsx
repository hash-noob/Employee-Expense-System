// import Sidebar from "../SideBar";
import BudgetCard from "./BudgetCards";
 import './admin.css'
import ActivityBar from './ActivityBar';
 import { useState,useEffect } from "react";
 import axios from 'axios'
 import { Routes, Route } from 'react-router-dom';
 import AddUsers from './AddUsers';
// const Dashboard=()=>{
//     const [stats, setStats] = useState({ userCount: 0, managerCount: 0});

//     useEffect(async() => {
//         const fetchData = async () => {
//             try {
//               const response = await axios.get('http://localhost:5000/api/admin/stats');
//               setStats(response.data);
//             } catch (error) {
//               console.error("There was an error fetching the stats!", error);
//             }
//           };
      
//           fetchData();
//       }, []);

//       const cardContents = [
//         { title: "No of Users", count: stats.userCount },
//         { title: "No of Managers", count: stats.managerCount },
//         //{ title: "Total No. of Claims This Week", count: stats.claimCount },
//       ];

//     return (
//         <div className="container">
//             <Sidebar/>
//             {cardContents.map((content, index) => (
//           <BudgetCard key={index} cardContent={content} />
//         ))}
//         </div>
        
//     )
// }

// export default Dashboard

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar'
import CustomCard from './Card';
import './admin.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, managerCount: 0});
  
    useEffect(() => {
      
        const fetchData = async () => {
            try {
              console.log("start")
              const response = await axios.get('http://localhost:3001/api/admin/stats');
              setStats(response.data);
            } catch (error) {
              console.error("There was an error fetching the stats!", error);
            }
          };
      
          fetchData();
      }, []);

      const cardContents = [
        { title: "No of Users", count: stats.userCount },
        { title: "No of Managers", count: stats.managerCount },
        //{ title: "Total No. of Claims This Week", count: stats.claimCount },
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
          {/* Add other routes here */}
        </Routes>

      </div>
      
    </div>
   
  );
};

export default Dashboard;
