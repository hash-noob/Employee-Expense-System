import React from 'react';
import { useEmployee } from './EmployeeContext';
import './admin.css';

const ActivityBar = () => {
  const { activities } = useEmployee();

  return (
    <div className="activitybar">
      <h1 className="activity-heading">Recent Activity</h1>
      <div>
        {activities.map((activity, index) => (
          activity && activity.employee ? (
            <div key={index} className="activity">
              <p className="activity-type">{activity.type}</p>
              <p className="activity-role">{`${activity.employee.role} ${activity.employee.eId}`}</p>
            </div>
          ) : (
            <div key={index} className="activity-error">
              <p>Error: Activity or employee information is missing.</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default ActivityBar;
