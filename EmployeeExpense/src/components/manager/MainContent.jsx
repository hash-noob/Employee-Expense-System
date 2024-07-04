import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manager.css'; // Assuming you have some basic CSS for styling
import { Routes, Route,useNavigate } from 'react-router-dom';
import ClaimDetails from './ClaimDetails';
import Header from './Header'
const MainContent = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [claims, setClaims] = useState([]);
    const token = localStorage.getItem('token');
    const [selectedClaim,setSelectedClaim] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                let endpoint = '';
                if (activeTab === 'pending') {
                    navigate(`/managerDashboard/`)
                    endpoint = 'http://localhost:3001/api/manager/pending-claims';
                } else if (activeTab === 'approved') {
                    navigate(`/managerDashboard/`)
                    endpoint = 'http://localhost:3001/api/manager/approved-claims';
                } else if (activeTab === 'rejected') {
                    navigate(`/managerDashboard/`)
                    endpoint = 'http://localhost:3001/api/manager/rejected-claims';
                }
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setClaims(response.data);
            } catch (error) {
               console.log(error)
            } 
        };

        fetchClaims();
    }, []);

    const RenderClaims = ({claims}) => {
        return claims.map(claim => (
            <div className="card" key={claim.cId} onClick={() =>{navigate(`/managerDashboard/claims/${claim.cId}`)
                                                                setSelectedClaim(claim)
                                                                localStorage.setItem('claim',JSON.stringify(claim))}}>
                <p>Employee ID: {claim.eId}</p>
                {/* <h3>Claim ID: {claim.cId}</h3> */}
                <p>Title: {claim.title}</p>
                <p>Total Amount: ${claim.totalAmount}</p>
                
                <p>From Date: {new Date(claim.fromDate).toLocaleDateString()}</p>
                <p>To Date: {new Date(claim.toDate).toLocaleDateString()}</p>
            </div>
        ));
    };
    console.log(activeTab);
    return (
        <div className="manager-main-content">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="content" style={{height:"100vh"}}>
                <Routes>
                    <Route path="/" element={<RenderClaims claims={claims} /> }/>
                    <Route path="/claims/:cId" element={<ClaimDetails claim ={selectedClaim} activeTab={activeTab}/>} />
                </Routes>
            </div>
        </div>
    );
};

export default MainContent;
