// // import React from "react";
// // import Sidebar from "./sidebar.jsx";
// // import PendingBills from './pendingbills.jsx';
// // import ApprovedBills from './approvedbills.jsx'
// // import RejecteBills from './rejectedbills.jsx'
// // import {BrowserRouter as Router} from "react-router-dom";
// // import { Routes, Route } from "react-router-dom";
// // import Settings from '../Setting/Settings';
// // import ChangePassword from '../Setting/ChangePassword';
// // import ChangeNumber from '../Setting/ChangeNumber';
// // import ManageBills from './manageBills.jsx'
// // import axios from 'axios'
// // const dashboard=()=>{
// //     const handleApprove = (claim) => {
// //         console.log('Claim approved:', claim);
// //         // You can add any additional logic you want here, such as updating local state or making further API calls
// //     };

// //     const handleReject = (claim) => {
// //         console.log('Claim rejected:', claim);
// //         // You can add any additional logic you want here, such as updating local state or making further API calls
// //     };
// //     return(
// //         <div className="flex">
// //             <Sidebar/>
// //             <main className="flex-1 p-4">
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// //                 <Routes>
// //                     <Route path="/" element={
// //                         <>
// //                         <PendingBills />
// //                         <ApprovedBills/>
// //                         <RejecteBills/>
// //                         </>
// //                     }
// //                     />
// //                     <Route path='/settings' element={<Settings/>}/>
// //                     <Route path='/settings/ChangePassword' element={<ChangePassword/>}/>
// //                     <Route path='/settings/ChangeNumber' element={<ChangeNumber/>}/>
// //                     <Route path='/managebills' element={
// //                          <ManageBills
// //                          onApprove={handleApprove}
// //                          onReject={handleReject}
// //                      />
// //                         }/>
// //                 </Routes>


// //             </div>
// //             </main>


// // </div>
// //     )
// // }
// // export default dashboard

// // components/dashboard.jsx
// import React from 'react';
// import Sidebar from './sidebar.jsx';
// import PendingBills from './pendingbills.jsx';
// import ApprovedBills from './approvedbills.jsx';
// import RejectedBills from './rejectedbills.jsx';
// import MainContent from './MainContent.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Settings from '../Setting/Settings';
// import ChangePassword from '../Setting/ChangePassword';
// import ChangeNumber from '../Setting/ChangeNumber';
// import ManageBills from './manageBills.jsx';
// import './manager.css';


// const Dashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div style={{flexGrow:"1"}}>
//         {/* <div className="grid-container"> */}
//           <Routes>
//             <Route
//               path="/"
//               // element={
//               //   <>
//               //     <PendingBills />
//               //     <ApprovedBills />
//               //     <RejectedBills />
//               //   </>
//               // }
//               element={<MainContent/>}
//             />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/settings/ChangePassword" element={<ChangePassword />} />
//             <Route path="/settings/ChangeNumber" element={<ChangeNumber />} />
//             <Route
//               path="/managebills"
//               element={
//                 <ManageBills
//                   onApprove={(claim) => console.log('Claim approved:', claim)}
//                   onReject={(claim) => console.log('Claim rejected:', claim)}
//                 />
//               }
//             />
//           </Routes>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import Sidebar from './sidebar.jsx';
import MainContent from './MainContent.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from '../Setting/Settings';
import ChangePassword from '../Setting/ChangePassword';
import ChangeNumber from '../Setting/ChangeNumber';
import ManageBills from './manageBills.jsx';
import './manager.css';

const Dashboard = () => {
  return (
    <div className="manager-dashboard">
      <Sidebar />
      <div className="manager-main-content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/ChangePassword" element={<ChangePassword />} />
          <Route path="/settings/ChangeNumber" element={<ChangeNumber />} />
          <Route 
            path="/managebills" 
            element={
              <ManageBills
                onApprove={(claim) => console.log('Claim approved:', claim)}
                onReject={(claim) => console.log('Claim rejected:', claim)}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
