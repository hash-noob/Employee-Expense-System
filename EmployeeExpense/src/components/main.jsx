import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Corrected import statement
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Userdashboard.jsx'
import axios from 'axios';

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

