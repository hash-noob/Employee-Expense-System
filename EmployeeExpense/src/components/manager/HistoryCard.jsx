import React from 'react';

const HistoryCard = ({ claim }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex-1">
        {/* <p className="text-lg font-semibold">Claim ID: {claim.cId}</p> */}
        <p className="text-lg font-semibold">Claim Title:{claim.title}</p>
        <p>Employee Id: {claim.eId}</p>
        <p>Status : {claim.status}</p>
        <p>Total Amount:{claim.totalAmount}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
