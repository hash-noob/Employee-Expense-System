import './App.css'
import BillContainer from './BillContainer';
import RequestList from './RequestList';
import Sidebar from './SideBar';
import { Routes,Route } from 'react-router-dom';
import React,{useState} from 'react';
import Settings from './Setting/Settings';
import ChangePassword from './Setting/ChangePassword';
import ChangeNumber from './Setting/ChangeNumber';
import History from './History';
import BillsContext from './BillsContext';
import Stats from './Stats';


  const Dashboard = () => {
    const [bills, setBills] = useState([]);

    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path='/' element =
                  {
                    <main className="flex-1 p-6">
                      <div className="flex">
                          <BillsContext.Provider value={{bills,setBills}}>
                            <BillContainer/>
                        <div className="w-1/3 ml-6">
                          <RequestList/>
                        </div>
                        </BillsContext.Provider>
                      </div>
                    </main>
                  } 
            />
            <Route path='/settings' element={<Settings role="user"/>}/>
            <Route path='/settings/ChangePassword' element = {<ChangePassword/>} />
            <Route path='/settings/ChangeNumber' element = {<ChangeNumber/>} />
            <Route path='/history' element={<History/>} />
            <Route path='/statistics' element={<Stats/>} />
          </Routes>
        </div>
      </div>
    );
  };

  export default Dashboard;
