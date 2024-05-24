import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  
    <App />
  </BrowserRouter>
)

// document.querySelector('form').addEventListener('onsubmit',(e)=>{
//   e.preventDefault()
//   axios.post('http://localhost:3001/api/user/login',{

//   })
// })