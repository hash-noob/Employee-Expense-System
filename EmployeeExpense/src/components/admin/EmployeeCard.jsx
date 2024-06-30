import React from 'react';
import './admin.css';

const EmployeeCard = ({ employee }) => {
  const { eId, role,type} = employee;

  return (
    <div className={`card-container-dashboard`}>
      <p>ID: {eId}</p>
      <p>Role: {role}</p>
      <p>Status: {type}</p>
    </div>
  );
}

export default EmployeeCard;
