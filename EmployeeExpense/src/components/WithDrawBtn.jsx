
import React,{useEffect, useState} from 'react';

const WithdrawButton = ({ claim,withdrawClaim }) => {

  let [isWithdrawn,setIsWithdrawn] = useState(false)

  const openPopup= ()=>{
    setIsWithdrawn(true)
  }

  const closePopup = ()=>{
    setIsWithdrawn(false)
  }

  const handleWithdraw = ()=>{
    withdrawClaim()
    closePopup()
  }

  return (
    <div>
    <button 
      onClick={openPopup} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Withdraw
    </button>
    { isWithdrawn && <WithdrawPopup handleClose = {closePopup} claim = {claim} handleWithdraw={handleWithdraw} />}
    </div>
  );
};

const WithdrawPopup = ({ handleClose,handleWithdraw,claim })=>(
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
      <div className="text-2xl font-bold ">
         Are you sure you want to withdraw {claim} claim?
      </div>
      <div className='flex justify-around my-5'>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded' onClick={handleWithdraw}>Yes</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded' onClick={handleClose} >No</button>
     
      </div>
    </div>
  </div>
)

export default WithdrawButton;
