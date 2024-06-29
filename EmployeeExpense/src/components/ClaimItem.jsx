import React from 'react';

const ClaimItem = ({ claim }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex-1">
        <p className="text-lg font-semibold">Claim ID: {claim.cId}</p>
        <p>Manager Name: {claim.mId}</p>
        <p>Status : {claim.status}</p>
        <p>Associated Bills: {claim.billsArray.reduce((res,prev)=>{ res+=prev.billId },'')}</p>
      </div>
    </div>
  );
};

export default ClaimItem;
