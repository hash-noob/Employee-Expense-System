
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './ClaimDetailPage.css';

const ClaimDetailPage = ({ claimId, goBack }) => {
  const [claim, setClaim] = useState(null);
  const [bills, setBills] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/manager/claim/${claimId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClaim(response.data.claim);
        setBills(response.data.bills);
      } catch (error) {
        console.error('Error fetching claim details:', error);
      }
    };

    fetchClaimDetails();
  }, [claimId]);

  if (!claim) return <div>Loading...</div>;

  return (
    <div className="claim-detail-page">
      <button onClick={goBack}>Back</button>
      <h3>Claim ID: {claim.cId}</h3>
      <p>Total Amount: ${claim.totalAmount}</p>
      <p>Employee ID: {claim.eId}</p>
      <p>From Date: {new Date(claim.fromDate).toLocaleDateString()}</p>
      <p>To Date: {new Date(claim.toDate).toLocaleDateString()}</p>

      <div className="bills-section">
        <h4>Bills</h4>
        {bills.map(bill => (
          <div key={bill.bId} className="bill-card">
            <h5>Bill ID: {bill.bId}</h5>
            <p>Type: {bill.type}</p>
            <p>Description: {bill.description}</p>
            <p>Amount: ${bill.amount}</p>
            <img src={bill.imageUrl} alt={`Bill ${bill.bId}`} />
          </div>
        ))}
      </div>

      <div className="claim-actions">
        <button onClick={() => handleApproveReject('approve')}>Approve</button>
        <button onClick={() => handleApproveReject('reject')}>Reject</button>
      </div>
    </div>
  );
};

const handleApproveReject = async (action) => {
  // Add functionality to handle approve/reject actions
  // You might want to call an API endpoint to update the claim status
  console.log(`Claim ${action}d`);
};

export default ClaimDetailPage;
