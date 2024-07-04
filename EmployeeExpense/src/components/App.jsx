import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './login';
import UserDashboard from './Dashboard';
import AdminDashboard from './admin/Dashboard'
import Dashboard from './manager/managerDashboard'
import AuthProvider, {useAuth} from './AuthProvider'
import ProtectedRoute from '../routes/ProtectedRoute'
import { EmployeeProvider } from './admin/EmployeeContext';
import AdminStats from './admin/AdminStats';

function App() {

  
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/adminDashboard/statistics" element={<AdminStats />} />
            <Route path="/adminDashboard/*" element={
                <EmployeeProvider>
                  <AdminDashboard />
                </EmployeeProvider>
              } />
            <Route path="/managerDashboard/*" element={<Dashboard/>}/>
          </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
