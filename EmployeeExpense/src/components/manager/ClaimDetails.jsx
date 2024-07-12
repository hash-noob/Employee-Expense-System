// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import BillContainer from './BillContainer';
// import Image from '../../assets/claimimage.png'


// const ClaimCard = ({ claim, onApprove, onReject ,activeTab}) => {
  
  
//   return (
//     <div className="claim-card  bg-white p-8 rounded-lg shadow-md flex flex-col">
//       <h2 className="text-2xl font-semibold mb-8">Claim Information</h2>
//       {/* <p><strong>Claim ID:</strong> {claim.cId}</p> */}
//       <p className="mb-3"><strong>Title:</strong> {claim.title}</p>
//       <p className="mb-3"><strong>Total Amount:</strong> ${claim.totalAmount}</p>
//       <p className="mb-3"><strong>Employee ID:</strong> {claim.eId}</p>
//       <p className="mb-3"><strong>From Date:</strong> {new Date(claim.fromDate).toLocaleDateString()}</p>
//       <p className="mb-3"><strong>To Date:</strong> {new Date(claim.toDate).toLocaleDateString()}</p>
      
//       <div className="flex justify-between mt-4">
//         {
//           activeTab==='pending'?<><button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => onApprove(claim)}>Approve</button>
//   <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => onReject(claim)}>Reject</button></>:
//   <></>
//         }
  
// </div>

//     </div>
//   );
// };

// const ClaimDetails = ({claim}) => {
//   const Navigate = useNavigate()
//   const [activeTab,setActiveTab]=useState();
//   const { cId } = useParams();
//   const [bills, setBills] = useState([]);
//   const token = localStorage.getItem('token');
//   const {billsArray} = JSON.parse(localStorage.getItem('claim'));
//   useEffect(() => {
//     setActiveTab(claim.status === 'pending' ? 'pending' : (claim.status === 'approved' ? 'approved' : 'rejected'));
//     //console.log(claim)
//     if(!claim){
//       Navigate('/managerDashboard')
//     }
//     const fetchClaimDetails = async () => {
     
//       try {
//         const res = await axios.post(`http://localhost:3001/api/manager/bills`,billsArray, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setBills(res.data);
//       } catch (error) {
//         console.log(error);
//       } 
//     };
//     claim =JSON.parse(localStorage.getItem('claim'))
//     fetchClaimDetails();
    
//   }, []);

//   const handleApprove = async (claim) => {
//     try {
//       const updatedClaim = await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
//         status: 'approved'
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const billsArray = updatedClaim.data.billsArray;
//       // console.log('billsArray:', billsArray);
//       const updateBillPromises = billsArray.map(billId => {
//         return axios.put(`http://localhost:3001/api/manager/bills/${billId}`, {
//           status: 'approved'
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }).then(response => {
//           console.log(`Updated bill ${billId}:`, response.data);
//         }).catch(error => {
//           console.error(`Error updating bill ${billId}:`, error);
//         });
//       });
//       await Promise.all(updateBillPromises);
  
//       alert("Claim Approved");
//       Navigate('/managerDashboard')
//     } catch (error) {
//       console.log('Error approving claim:', error);
//     }
//   };
//   const handleReject = async (claim) => {
//     try {
//       const updatedClaim = await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
//         status: 'rejected'
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const billsArray = updatedClaim.data.billsArray;
//       const updateBillPromises = billsArray.map(billId => {
//         return axios.put(`http://localhost:3001/api/manager/bills/${billId}`, {
//           status: 'rejected'
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }).then(response => {
//           console.log(`Updated bill ${billId}:`, response.data);
//         }).catch(error => {
//           console.error(`Error updating bill ${billId}:`, error);
//         });
//       });
//       await Promise.all(updateBillPromises);
  
//       alert("Claim Rejected");
//       Navigate('/managerDashboard')
//     } catch (error) {
//       console.log('Error approving claim:', error);
//     }
//   };
  
//   return (
//     <div className="claim-details max-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
//       <div className="bills-section">
//         <BillContainer bills={bills} setBills={setBills} />
//       </div>
//       <div className="claim-info-section">{claim ? (
//           <ClaimCard claim={claim} onApprove={handleApprove} onReject={handleReject} activeTab={activeTab} />
//         ) : (
//           <div className="flex flex-col items-center justify-center">
//             <img src={Image} alt="No Claims" className="w-1/2 h-1/2" />
//             <p className="text-lg mt-4">No claim details available</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClaimDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BillContainer from './BillContainer';
import RemarkPopup from './RemarkPopup';
import Image from '../../assets/claimImage.png';

const ClaimCard = ({ claim, onApprove, onReject, activeTab }) => {
  return (
    <div className="claim-card bg-white p-8 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold mb-8">Claim Information</h2>
      <p className="mb-3"><strong>Title:</strong> {claim.title}</p>
      <p className="mb-3"><strong>Total Amount:</strong> ${claim.totalAmount}</p>
      <p className="mb-3"><strong>Employee ID:</strong> {claim.eId}</p>
      <p className="mb-3"><strong>From Date:</strong> {new Date(claim.fromDate).toLocaleDateString()}</p>
      <p className="mb-3"><strong>To Date:</strong> {new Date(claim.toDate).toLocaleDateString()}</p>
      <div className="flex justify-between mt-4">
        {activeTab === 'pending' ? (
          <>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => onApprove(claim)}>
              Approve
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={() => onReject(claim)}>
              Reject
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

const ClaimDetails = ({ claim }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState();
  const { cId } = useParams();
  const [bills, setBills] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
  const [action, setAction] = useState(null); // State to track which action (approve/reject) was taken
  const token = localStorage.getItem('token');
  const { billsArray } = JSON.parse(localStorage.getItem('claim'));

  useEffect(() => {
    setActiveTab(claim.status === 'pending' ? 'pending' : (claim.status === 'approved' ? 'approved' : 'rejected'));
    console.log(claim);
    if (!claim) {
      navigate('/managerDashboard');
    }
    const fetchClaimDetails = async () => {
      try {
        const res = await axios.post(`http://localhost:3001/api/manager/bills`, billsArray, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBills(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    claim = JSON.parse(localStorage.getItem('claim'));
    fetchClaimDetails();
  }, []);

  const handleApprove = (claim) => {
    setAction('approved');
    setIsPopupOpen(true);
  };

  const handleReject = (claim) => {
    setAction('rejected');
    setIsPopupOpen(true);
  };

  const submitRemark = async (remark) => {
    try {
      const updatedClaim = await axios.put(
        `http://localhost:3001/api/manager/claimbyid/${claim.cId}`,
        {
          status: action,
          remarks: remark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(remark);
      const billsArray = updatedClaim.data.billsArray;
      const updateBillPromises = billsArray.map((billId) => {
        return axios.put(
          `http://localhost:3001/api/manager/bills/${billId}`,
          {
            status: action,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((response) => {
          console.log(`Updated bill ${billId}:`, response.data);
        }).catch((error) => {
          console.error(`Error updating bill ${billId}:`, error);
        });
      });
      await Promise.all(updateBillPromises);

      alert(`Claim ${action === 'approve' ? 'Approved' : 'Rejected'}`);
      navigate('/managerDashboard');
    } catch (error) {
      console.log(`Error ${action === 'approve' ? 'approving' : 'rejecting'} claim:`, error);
    }
  };

  return (
    <div className="claim-details max-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bills-section">
        <BillContainer bills={bills} setBills={setBills} />
      </div>
      <div className="claim-info-section">
        {claim ? (
          <ClaimCard claim={claim} onApprove={handleApprove} onReject={handleReject} activeTab={activeTab} />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={Image} alt="No Claims" className="w-1/2 h-1/2" />
            <p className="text-lg mt-4">No claim details available</p>
          </div>
        )}
      </div>
      <RemarkPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={submitRemark}
      />
    </div>
  );
};

export default ClaimDetails;
