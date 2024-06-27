// ActivityBar.js
import React from 'react';
import { useEmployee } from './EmployeeContext';
import EmployeeCard from './EmployeeCard';
import './admin.css';

const ActivityBar = () => {
  const { activities } = useEmployee();

  return (
    <div className="activitybar">
      <h1>Recent Activity</h1>
      <div>
        {activities.map((activity, index) => (
          <div key={index} className="activity">
            <p>{`Employee ${activity.employee.eId} was ${activity.type}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityBar;
