import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from 'axios'
//import {useAuth} from './AuthProvider'
import './admin.css';
import '../App.css';


function AddUsers() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
//  var auth = useAuth();
// const navigate = useNavigate();

const handleAddUser = async (e,role) => {
  e.preventDefault();
  
  const form = e.target;
    const eId = form.querySelector("#eId");
    const mail = form.querySelector("#mail");
    const Mnumber = form.querySelector("#Mnumber");
  
  try{
    
    const user=await axios.post("http://localhost:3001/api/user/signup",{
      "eId":eId.value,
      "email":mail.value,
      "password":eId.value,
    "role":role,
    "mobileNumber":Mnumber.value
    })
    console.log(user)
    if(user.status===200){
      if(role==='user')
      setMessage('User added successfully!');
      else
      setMessage('Manager added successfully!');
    }
  }
  catch(err){
    console.log("error");
    if(role==='user')
    setMessage('Error: User already exists or there was an issue.');
  else
  setMessage('Error: Manager already exists or there was an issue.');
  }
  eId.value="";
    mail.value="";
    Mnumber.value="";
  
};


  return (
    <div>
      <div className='card-container-dashboard'>
        <div className='card-heading-dashboard'>
        <h1>Add New <span>User</span></h1>
        <button style={{width:'max-content'}} className="btn">Add Bulk Users</button>
        </div>
        
        
        <form method='post'  onSubmit={(e) => handleAddUser(e, 'user')}>
            
              
              <input id="eId" type="text" name='eId' placeholder='Employee-Id' className="form-group" required />
            
            <div className="form-group">
              
              <input id="mail" type="email" name='email' placeholder='Employee-MailId' required />
            </div>
            <div className="form-group">
              
              <input id="Mnumber" type="number" name='Mnumber' placeholder='Employee-MobileNumber' required />
            </div>
            <button type="submit"  className="btn">Add</button>
            
            {message && (
          <div className="popup">
            <h2>{message}</h2>
          </div>
        )}
        </form>
      </div>
      <div className='card-container-dashboard'>
      
      <div className='card-heading-dashboard'>
        <h1>Add New <span>Manager</span></h1>
        <button style={{width:'max-content'}} className="btn btn-w">Add Bulk Managers</button>
        </div>
        <form method='post'  onSubmit={(e) => handleAddUser(e, 'manager')}>
            <div className="form-group">
              
              <input id="eId" type="text" name='eId' placeholder='Manager-Id' required />
            </div>
            <div className="form-group">
              
              <input id="mail" type="email" name='email' placeholder='Manager-MailId' required />
            </div>
            <div className="form-group">
              
              <input id="Mnumber" type="number" name='Mnumber' placeholder='Manager-MobileNumber' required />
            </div>
            <button type="submit"  className="btn-w btn">Add</button>
            
            {message && (
          <div className="popup">
            <h2>{message}</h2>
          </div>
        )}
        </form>
        </div>
    </div>
  );
}

export default AddUsers;
