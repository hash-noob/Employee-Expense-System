// components/BillCard.jsx
import React from 'react';
import './manager.css';

const BillCard = ({ eId, title, totalAmount, fromDate, toDate }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">Employee ID: {eId}</p>
        <p className="card-text">Total Amount: ${totalAmount}</p>
        <p className="card-text">Dated From: {fromDate}</p>
        <p className="card-text">Dated To: {toDate}</p>
      </div>
    </div>
  );
};

export default BillCard;
