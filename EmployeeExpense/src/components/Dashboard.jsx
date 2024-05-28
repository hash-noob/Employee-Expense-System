import './App.css'
import BillContainer from './BillContainer';
import RequestList from './RequestList';
import Sidebar from './SideBar';
import AddClaimPane from './AddClaimPane';
import React from 'react';


const Dashboard = () => {


  return (
    <div className="flex">
     {/* <AddClaimPane /> */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="flex">
              <BillContainer/>
            <div className="w-1/3 ml-6">
              <RequestList/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
