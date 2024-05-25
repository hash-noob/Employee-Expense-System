import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './login';
import Dashboard from './Dashboard';
import AuthProvider, {useAuth} from './AuthProvider'
import ProtectedRoute from '../routes/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
