import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from './AuthProvider'
import './App.css';

function Login() {
 var auth = useAuth();
const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();
  
  const eId = document.getElementById("eId").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById('message');
  
  try {
      const success = await auth.loginAction(eId, password);
      
      if (success) {
         const role=await auth.getRole(eId);
        if(role==='user')
          navigate('/dashboard');
        else if(role==='admin'){
          console.log(role)
          navigate('/adminDashboard');
        }
      } else {
          // Display login failed message
          messageElement.textContent = 'Login failed. Please check your credentials.';
      }
  } catch (error) {
      console.error(error);
      // Display error message if login action throws an error
      messageElement.textContent = 'An error occurred while logging in.';
  }
};


  return (
    <div className='app-container'>
      <div className="form-container">
        <h2>Login</h2>
        <form method='post' onSubmit={handleLogin}>
          <div className="form-group">
            <label>Employee Id:</label>
            <input id="eId" type="text" name='eId' required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input id="password" type="password" name='password' required />
          </div>
          <button type="submit"  className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <h2 id="message"></h2>
        </form>
      </div>
    </div>
  );
}

export default Login;
