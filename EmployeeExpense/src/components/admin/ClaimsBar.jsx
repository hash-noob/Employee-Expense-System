import React from 'react';
import { useEmployee } from './EmployeeContext';

const ClaimsBar = () => {
  const { claims } = useEmployee();

  return (
    <div style={{width:'30vw'}}>
    <div className="activitybar">
      <h1 className="activity-heading">Claims List</h1>
      {claims.length === 0 ? (
        <p>No claims to display</p>
      ) : (
        claims.map((claim) => (
          <div key={claim.cId} className='activity' >
            <p> <span style={{fontWeight:'600'}}>Claim Title:</span>  {claim.title}</p>
            <p> <span style={{fontWeight:'600'}}>Employee ID: </span> {claim.eId}</p>
            <p> <span style={{fontWeight:'600'}}>Manager ID: </span> {claim.mId}</p>
            <p><span style={{fontWeight:'600'}}> Total Amount: </span> Rs.{claim.totalAmount}</p>
            <p> <span style={{fontWeight:'600'}}>Status:  </span>{claim.status}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default ClaimsBar;
