import React from 'react';
import { useEmployee } from './EmployeeContext';

const ClaimsBar = () => {
  const { claims } = useEmployee();

  return (
    <div className="activitybar">
      <h1>Claims List</h1>
      {claims.length === 0 ? (
        <p>No claims to display</p>
      ) : (
        claims.map((claim) => (
          <div key={claim.cId} className='activity' >
            <p><strong>Claim ID:</strong> {claim.cId}</p>
            <p><strong>Employee ID:</strong> {claim.eId}</p>
            <p><strong>Manager ID:</strong> {claim.mId}</p>
            <p><strong>Total Amount:</strong> ${claim.totalAmount}</p>
            <p><strong>Status:</strong> {claim.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ClaimsBar;
