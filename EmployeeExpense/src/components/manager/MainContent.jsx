import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manager.css'; // Assuming you have some basic CSS for styling
import { Routes, Route,useNavigate } from 'react-router-dom';
import ClaimDetails from './ClaimDetails';
import Header from './Header'
const MainContent = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            setLoading(true);
            setError(null);
            try {
                let endpoint = '';
                if (activeTab === 'pending') {
                    endpoint = 'http://localhost:3001/api/manager/pending-bills';
                } else if (activeTab === 'approved') {
                    endpoint = 'http://localhost:3001/api/manager/approved-bills';
                } else if (activeTab === 'rejected') {
                    endpoint = 'http://localhost:3001/api/manager/rejected-bills';
                }

                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setClaims(response.data);
            } catch (error) {
                setError('Error fetching claims');
            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, [activeTab, token]);

    const renderClaims = (claims) => {
        return claims.map(claim => (
            <div className="card" key={claim.cId} onClick={() => navigate(`/managerDashboard/claims/${claim.cId}`)}>
                <p>Employee ID: {claim.eId}</p>
                {/* <h3>Claim ID: {claim.cId}</h3> */}
                <p>Title: {claim.title}</p>
                <p>Total Amount: ${claim.totalAmount}</p>
                
                <p>From Date: {new Date(claim.fromDate).toLocaleDateString()}</p>
                <p>To Date: {new Date(claim.toDate).toLocaleDateString()}</p>
            </div>
        ));
    };

    return (
        <div className="manager-main-content">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="content">
                <Routes>
                    <Route path="/" element={
                        <>
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {!loading && !error && renderClaims(claims)}
                        </>
                    } />
                    <Route path="/claims/:cId" element={<ClaimDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainContent;
