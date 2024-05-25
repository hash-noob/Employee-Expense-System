import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './login';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
