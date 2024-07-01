import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar'
import './ManagerDashboard.css';
import { Routes, Route,useNavigate } from "react-router-dom";
import Settings from '../Setting/Settings';
import ChangePassword from '../Setting/ChangePassword';
import ChangeNumber from '../Setting/ChangeNumber';
import ClaimDetailPage from './ClaimDetailPage';

const ManagerDashboard = () => {
  const [selectedClaimType, setSelectedClaimType] = useState('pending');
  const [claims, setClaims] = useState([]);
 const [selectedClaimId, setSelectedClaimId] = useState(null);
  const token = localStorage.getItem('token'); // Ensure this token is correctly set during login/authentication
  const navigate=useNavigate()

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        let endpoint = '';
        if (selectedClaimType === 'pending') {
          endpoint = 'http://localhost:3001/api/manager/pending-bills';
        } else if (selectedClaimType === 'approved') {
          endpoint = 'http://localhost:3001/api/manager/approved-bills';
        } else if (selectedClaimType === 'rejected') {
          endpoint = 'http://localhost:3001/api/manager/rejected-bills';
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClaims(response.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, [selectedClaimType]);

  const handleSectionClick = (section) => {
    if (section === 'pending') {
      document.getElementById('pending').style = 'opacity:100%';
      document.getElementById('approved').style = 'opacity:40%';
      document.getElementById('rejected').style = 'opacity:40%';
    } else if (section === 'approved') {
      document.getElementById('pending').style = 'opacity:40%';
      document.getElementById('approved').style = 'opacity:100%';
      document.getElementById('rejected').style = 'opacity:40%';
    } else {
      document.getElementById('pending').style = 'opacity:40%';
      document.getElementById('approved').style = 'opacity:40%';
      document.getElementById('rejected').style = 'opacity:100%';
    }
    setSelectedClaimType(section);
  };
  const onClaimClick = (claimId) => {
    navigate(`/claim/${claimId}`);
  };
  // const handleClaimClick = (claimId) => {
  //   navigate(`/claim/${claimId}`);
  // };
  // const goBack = () => {
  //   setSelectedClaimId(null);
  // };

  return (
    <div className="manager-dashboard">
       <SideBar /> 
      <div className="main-content">
        <Routes>
          <Route path='/' element={
            <>
            <Header handleSectionClick={handleSectionClick} />
            <ClaimDetails claims={claims} onClaimClick={onClaimClick} />
            </>
          }>
          </Route>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/settings/ChangePassword' element={<ChangePassword/>}/>
          <Route path='/settings/ChangeNumber' element={<ChangeNumber/>}/>
          <Route path='/claim/:claimId' element={<ClaimDetailPage />} />
        </Routes>
        
      </div>
    </div>
  );
};

// const Sidebar = () => (
//   <div className="sidebar">
//     <ul>
//       <li>Dashboard</li>
//       <li>History</li>
//       <li>Settings</li>
//       <li>Logout</li>
//     </ul>
//   </div>
// );

const Header = ({ handleSectionClick }) => (
  <div className="header">
    <button id="pending" onClick={() => handleSectionClick('pending')}>Pending Claims</button>
    <button id="approved" onClick={() => handleSectionClick('approved')}>Approved Claims</button>
    <button id="rejected" onClick={() => handleSectionClick('rejected')}>Rejected Claims</button>
  </div>
);

const ClaimDetails = ({ claims, onClaimClick }) => (
  <div className="claim-details">
    {claims.map(claim => (
      <div key={claim.cId} className="claim-card" onClick={() => onClaimClick(claim.cId)}>
        <h3>Claim ID: {claim.cId}</h3>
        <p>Total Amount: ${claim.totalAmount}</p>
        <p>Employee ID: {claim.eId}</p>
        <p>From Date: {new Date(claim.fromDate).toLocaleDateString()}</p>
        <p>To Date: {new Date(claim.toDate).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
);

export default ManagerDashboard;
