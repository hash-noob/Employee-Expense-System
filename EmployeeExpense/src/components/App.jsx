import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './login';
import UserDashboard from './Dashboard';
import AdminDashboard from './admin/Dashboard'
import ManagerDashboard from './managercomponents/Dashboard'
import AuthProvider, {useAuth} from './AuthProvider'
import ProtectedRoute from '../routes/ProtectedRoute'
import { EmployeeProvider } from './admin/EmployeeContext';

function App() {

  
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard/*" element={<UserDashboard />} />
          <Route path="/adminDashboard/*" element={
              <EmployeeProvider>
                <AdminDashboard />
              </EmployeeProvider>
            } />
          <Route path="/managerDashboard/*" element={<ManagerDashboard/>}/>
          
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
