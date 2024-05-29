import React from 'react';
import './BudgetCard.css';

const BudgetCard = ({cardContent}) => {
  return (
    <div className="budget-card">
      <div className="budget-header">
        <h3>{cardContent.title}</h3>
      </div>
      <div className="budget-amount">
        <h1>{cardContent.count}</h1>
      </div>
      {/* <div className="budget-footer">
        <p><span className="decrease">↓ 12%</span> Since last month</p>
      </div>
      <div className="budget-icon">
        <i className="calendar-icon">📅</i>
      </div> */}
    </div>
  );
};

export default BudgetCard;
