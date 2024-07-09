import React, { useContext, useState } from "react";
import axios from "axios";
import {format} from 'date-fns'
import WithdrawButton from "./WithDrawBtn";
import billsContext from "./BillsContext";

const  RequestCard = ({ request,claims,setClaims }) =>{

  const {bills,setBills} = useContext(billsContext)
  const [isPopupOpen,setIsPopupOpen] = useState(false)

  function handleOpenPopup(){
    setIsPopupOpen(true)
  }
  function handleClosePopup(){
    setIsPopupOpen(false)
  }

  const withdrawClaim = async ()=>{

      try{
           const billsArray = claims.find((ele)=>(ele.cId === request.cId)).billsArray

           const res = await axios.put("http://localhost:3001/api/user/claims/withdraw",{cId : request.cId,billsArray})
           const {updatedClaim,updatedBills} = res.data;
           
            if(updatedClaim){
              setClaims(claims.filter((ele)=>ele.cId!=updatedClaim.data.cId))
            }
            if(updatedBills){
              setBills(bills.concat(updatedBills))
            }
      }catch(err){
        console.log(err)
      }
  }
  
  return (
          <div className="p-4 bg-white rounded-lg shadow-md mb-4 ">
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <a href='#' className="text-blue-500 hover:underline" onClick={handleOpenPopup}>view details</a>
            <p className="text-gray-600">Rs.{request.totalAmount}</p>
            {isPopupOpen && <ClaimDetailsPopupPane claim={request} onClose={handleClosePopup}/>}
              <WithdrawButton claim = {request.title} withdrawClaim = {withdrawClaim}/>
          </div>
        )
}

const ClaimDetailsPopupPane = ({ claim,onClose }) => {
  if (!claim) return null;

const {
  cId,
  billsArray,
  mId,
  title,
  totalAmount,
  fromDate,
  toDate,
  comments,
} = claim;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg h-lvh overflow-scroll">
        <h2 className="text-2xl font-bold mb-4">Claim Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Claims ID:</label>
          <p className="text-gray-700">{cId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Filed bills:</label>
          <p className="text-gray-700"> {billsArray.toString()}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Review Manager ID:</label>
          <p className="text-gray-700">{mId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Title:</label>
          <p className="text-gray-700">{title}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Comment:</label>
          <p className="text-gray-700">{comments}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Dated From:</label>
          <p className="text-gray-700">{format(new Date(fromDate), 'MM/dd/yyyy')} to {format(new Date(toDate), 'MM/dd/yyyy')}  </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Total Amount:</label>
          <p className="text-gray-700">{totalAmount}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default RequestCard