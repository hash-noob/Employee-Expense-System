import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './login.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  
    <App />
  </BrowserRouter>
)

