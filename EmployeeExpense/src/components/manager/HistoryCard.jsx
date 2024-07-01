import React from 'react';

const HistoryCard = ({ claim }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex-1">
        <p className="text-lg font-semibold">Claim ID: {claim.cId}</p>
        <p>Title:{claim.title}</p>
        <p>Manager Name: {claim.mId}</p>
        <p>Status : {claim.status}</p>
        <p>Total Amount:{claim.totalAmount}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
