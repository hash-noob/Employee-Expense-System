import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from './AuthProvider'
import PasswordInput from './PasswordInput';
import './App.css';

function Login() {
 var auth = useAuth();
 const [password,setPassword] = useState()
const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  
  const eId = document.getElementById("eId").value;
  const messageElement = document.getElementById('message');
  
  try {
      const success = await auth.loginAction(eId, password);
      if (success) {
         const role=await auth.getRole(eId);
        if(role==='user')
          navigate('/dashboard');
        else if(role==='admin'){
          navigate('/adminDashboard');
        }
        else if(role==="manager"){
          navigate('/managerDashboard')
        }
      } else {
          // Display login failed message
          messageElement.textContent = 'Login failed. Please check your credentials.';
          console.log(eId)
      }
  } catch (error) {
      console.log(error)
      // Display error message if login action throws an error
      messageElement.textContent = 'An error occurred while logging in.';
  }
};


  return (
    <div className='app-container'>
      <div className="form-container">
        <h1 className='font-bold text-lg'>Login</h1>
        <form method='post' onSubmit={handleLogin}>
          <div className="form-group">
            <label>Employee Id:</label>
            <input id="eId" type="text" name='eId' required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <PasswordInput  onchange={(e)=>(setPassword(e.target.value))} placeholder='' id='password' />
          </div>
          <button type="submit"  className="btn">Login</button>
          <div className='text-right text-sm'><a href="#" onClick={()=>{navigate('forgotPassword')}}>Forgot password?</a></div>
          <h2 id="message"></h2>
        </form>
      </div>
    </div>
  );
}

export default Login;
