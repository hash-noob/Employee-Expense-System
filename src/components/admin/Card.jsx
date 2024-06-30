import React from 'react';
import './admin.css';

const CustomCard = ({ Content }) => {
  return (
    <div className="dashboard-card">
      <div className="card-title">{Content.title}</div>
      <div className="card-sales">{Content.count}</div>
      {/* <div className="card-percentage" style={{ color: positive ? 'green' : 'red' }}>
        {percentage}
      </div> */}
    </div>
  );
};

export default CustomCard;
