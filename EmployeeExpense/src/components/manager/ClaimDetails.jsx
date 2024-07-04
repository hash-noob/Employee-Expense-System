import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BillContainer from './BillContainer';

const ClaimCard = ({ claim, onApprove, onReject ,activeTab}) => {
  console.log("cliamcard")
  console.log(activeTab)
  return (
    <div className="claim-card  bg-white p-8 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold mb-8">Claim Information</h2>
      {/* <p><strong>Claim ID:</strong> {claim.cId}</p> */}
      <p class="mb-3"><strong>Title:</strong> {claim.title}</p>
      <p class="mb-3"><strong>Total Amount:</strong> ${claim.totalAmount}</p>
      <p class="mb-3"><strong>Employee ID:</strong> {claim.eId}</p>
      <p class="mb-3"><strong>From Date:</strong> {new Date(claim.fromDate).toLocaleDateString()}</p>
      <p class="mb-3"><strong>To Date:</strong> {new Date(claim.toDate).toLocaleDateString()}</p>
      
      <div className="flex justify-between mt-4">
        {
          activeTab==='pending'?<><button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => onApprove(claim)}>Approve</button>
  <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => onReject(claim)}>Reject</button></>:
  <></>
        }
  
</div>

    </div>
  );
};

const ClaimDetails = ({claim}) => {
  const { cId } = useParams();
  const [bills, setBills] = useState([]);
  const token = localStorage.getItem('token');
  const {billsArray} = JSON.parse(localStorage.getItem('claim'));
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:3001/api/manager/bills`,billsArray, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBills(res.data);
      } catch (error) {
        console.log(error);
      } 
    };
    claim =JSON.parse(localStorage.getItem('claim'))
    fetchClaimDetails();
    
  }, []);

  const handleApprove = async (claim) => {
    try {
      const updatedClaim = await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
        status: 'approved'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const billsArray = updatedClaim.data.billsArray;
      // console.log('billsArray:', billsArray);
      const updateBillPromises = billsArray.map(billId => {
        return axios.put(`http://localhost:3001/api/manager/bills/${billId}`, {
          status: 'approved'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          console.log(`Updated bill ${billId}:`, response.data);
        }).catch(error => {
          console.error(`Error updating bill ${billId}:`, error);
        });
      });
      await Promise.all(updateBillPromises);
  
      alert("Claim Approved");
      Navigate('/managerDashboard')
    } catch (error) {
      console.log('Error approving claim:', error);
    }
  };
  const handleReject = async (claim) => {
    try {
      const updatedClaim = await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
        status: 'rejected'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const billsArray = updatedClaim.data.billsArray;
      const updateBillPromises = billsArray.map(billId => {
        return axios.put(`http://localhost:3001/api/manager/bills/${billId}`, {
          status: 'rejected'
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          console.log(`Updated bill ${billId}:`, response.data);
        }).catch(error => {
          console.error(`Error updating bill ${billId}:`, error);
        });
      });
      await Promise.all(updateBillPromises);
  
      alert("Claim Rejected");
      Navigate('/managerDashboard')
    } catch (error) {
      console.log('Error approving claim:', error);
    }
  };
  const activeTab = claim.status === 'pending' ? 'pending' : (claim.status === 'approved' ? 'approved' : 'rejected');
  return (
    <div className="claim-details max-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bills-section">
        <BillContainer bills={bills} setBills={setBills} />
      </div>
      <div className="claim-info-section">
        <ClaimCard claim={claim} onApprove={handleApprove} onReject={handleReject} activeTab={activeTab}/>
      </div>
    </div>
  );
};

export default ClaimDetails;
