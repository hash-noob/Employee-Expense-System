import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BillContainer from './BillContainer';

const ClaimCard = ({ claim, onApprove, onReject }) => {
  return (
    <div className="claim-card bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Claim Information</h2>
      {/* <p><strong>Claim ID:</strong> {claim.cId}</p> */}
      <p><strong>Title:</strong> {claim.title}</p>
      <p><strong>Total Amount:</strong> ${claim.totalAmount}</p>
      <p><strong>Employee ID:</strong> {claim.eId}</p>
      <p><strong>From Date:</strong> {new Date(claim.fromDate).toLocaleDateString()}</p>
      <p><strong>To Date:</strong> {new Date(claim.toDate).toLocaleDateString()}</p>
      <div className="flex justify-between mt-4">
  <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => onApprove(claim)}>Approve</button>
  <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => onReject(claim)}>Reject</button>
</div>

    </div>
  );
};

const ClaimDetails = () => {
  const { cId } = useParams();
  const [claim, setClaim] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClaimDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const claimResponse = await axios.get(`http://localhost:3001/api/manager/claimbyid/${cId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClaim(claimResponse.data);

        const billsResponse = await axios.get(`http://localhost:3001/api/manager/bills/${cId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBills(billsResponse.data);
      } catch (error) {
        setError('Error fetching claim details');
      } finally {
        setLoading(false);
      }
    };

    fetchClaimDetails();
  }, [cId, token]);

  const handleApprove = async (claim) => {
    try {
      await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
        status: 'approved'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClaim(prevClaim => ({ ...prevClaim, status: 'approved' }));
      alert('Claim has been approved');
    } catch (error) {
      setError('Error approving claim');
    }
  };

  const handleReject = async (claim) => {
    try {
      await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
        status: 'rejected'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClaim(prevClaim => ({ ...prevClaim, status: 'rejected' }));
      alert('Claim has been rejected');
    } catch (error) {
      setError('Error rejecting claim');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!claim) return <p>No claim found</p>;

  return (
    <div className="claim-details grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bills-section">
        <BillContainer bills={bills} setBills={setBills} />
      </div>
      <div className="claim-info-section">
        <ClaimCard claim={claim} onApprove={handleApprove} onReject={handleReject} />
      </div>
    </div>
  );
};

export default ClaimDetails;
