import React from 'react';

const ClaimItem = ({ claim }) => {
  const bills= claim.billsArray.join(",");
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex-1">
        <p className="text-lg font-semibold">Title: {claim.title}</p>
        <p>Manager ID: {claim.mId}</p>
        <p>Status : {claim.status}</p>
        <p>Associated Bills: {bills}</p>
        <p>Total Amount: Rs.{claim.totalAmount}</p>
      </div>
    </div>
  );
};

export default ClaimItem;
