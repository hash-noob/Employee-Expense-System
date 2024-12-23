// // components/BillCard.jsx
// import React from 'react';
// import './manager.css';

// const BillCard = ({ bill }) => {
//   const { billId, billAmount, category, merchant, remark, datedOn, paymentMethod } = bill;
//   return (
//     <div className="card">
//       <div className="card-body">
//         <p className="card-text">Bill ID: {billId}</p>
//         <p className="card-text">Bill Amount: ${billAmount}</p>
//         <p className="card-text">Category: {category}</p>
//         <p className="card-text">Merchant: {merchant}</p>
//         <p className="card-text">Remark: {remark}</p>
//         <p className="card-text">Dated On: {new Date(datedOn).toLocaleDateString()}</p>
//         <p className="card-text">Payment Method: {paymentMethod}</p>
//       </div>
//     </div>
//   );
// };

// export default BillCard;


import React,{ useContext, useState } from "react";
import axios from "axios";
import {format} from 'date-fns';
import billImg from '../../assets/bill.jpg'

const BillCard = ({ bill }) => {
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
      };
    
      const handleClosePopup = () => {
        setIsPopupOpen(false);
      };


    return (
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg font-semibold">{bill.billId}</h3>
                <p className="text-gray-600">{bill.category}</p>
                <div className="mt-2">
                    <a  className="text-blue-500 hover:underline" onClick={handleOpenPopup}>
                    view details
                    </a>
                </div>
                {isPopupOpen && (
                    <BillDetailsPopupPane onClose={handleClosePopup} bill= {bill} />
                )}
            </div>
        );
}


const BillDetailsPopupPane = ({ onClose, bill }) => {
    if (!bill) return null;

    const {
        billId,
        billAmount,
        billImage,
        category,
        merchant,
        remark,
        datedOn,
        paymentMethod,
      } = bill;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg h-lvh overflow-scroll">
          <h2 className="text-2xl font-bold mb-4">Bill Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Bill ID:</label>
            <p className="text-gray-700">{billId}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Bill Amount:</label>
            <p className="text-gray-700">${billAmount}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Category:</label>
            <p className="text-gray-700">{category}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Merchant:</label>
            <p className="text-gray-700">{merchant}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Remark:</label>
            <p className="text-gray-700">{remark}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Dated On:</label>
            <p className="text-gray-700">{format(new Date(datedOn), 'MM/dd/yyyy')}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Bill Image</label>
            <img src={billImage?billImage:billImg} alt="bill image" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Payment Method:</label>
            <p className="text-gray-700">{paymentMethod}</p>
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
  
  
export default BillCard