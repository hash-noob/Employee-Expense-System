// // ActivityBar.js
// import React from 'react';
// import { useEmployee } from './EmployeeContext';
// import EmployeeCard from './EmployeeCard';
// import './admin.css';

// const ActivityBar = () => {
//   const { activities } = useEmployee();

//   return (
//     <div className="activitybar">
//       <h1>Recent Activity</h1>
//       <div>
//         {activities.map((activity, index) => (
//           <div key={index} className="activity">
//             <p>{`Employee ${activity.employee.eId} was ${activity.type}`}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ActivityBar;

// import React from 'react';
// import { useEmployee } from './EmployeeContext';
// import './admin.css';

// const ActivityBar = () => {
//   const { activities } = useEmployee();

//   return (
//     <div className="activitybar">
//       <h1>Recent Activity</h1>
//       <div>
//         {activities.map((activity, index) => (
//           <div key={index} className="activity">
//             <p>{`${activity.employee.role} ${activity.employee.eId} was ${activity.type}`}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useEmployee } from './EmployeeContext';
import './admin.css';

const ActivityBar = () => {
  const { activities } = useEmployee();

  return (
    <div className="activitybar">
      <h1>Recent Activity</h1>
      <div>
        {activities.map((activity, index) => (
          <div key={index} className="activity">
            <p className="activity-type">{activity.type}</p>
            <p className="activity-role">{`${activity.employee.role} ${activity.employee.eId}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ActivityBar;
