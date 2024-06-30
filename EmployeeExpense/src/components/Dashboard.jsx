import './App.css'
import BillContainer from './BillContainer';
import RequestList from './RequestList';
import Sidebar from './SideBar';
import { Routes,Route } from 'react-router-dom';
import React from 'react';
import Settings from './Setting/Settings';
import ChangePassword from './Setting/ChangePassword';
import ChangeNumber from './Setting/ChangeNumber';


  const Dashboard = () => {


    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path='/' element =
                  {
                    <main className="flex-1 p-6">
                      <div className="flex">
                          <BillContainer/>
                        <div className="w-1/3 ml-6">
                          <RequestList/>
                        </div>
                      </div>
                    </main>
                  } 
            />
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/settings/ChangePassword' element = {<ChangePassword/>} />
            <Route path='/settings/ChangeNumber' element = {<ChangeNumber/>} />
          </Routes>
        </div>
      </div>
    );
  };

  export default Dashboard;
