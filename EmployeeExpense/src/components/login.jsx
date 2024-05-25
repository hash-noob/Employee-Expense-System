import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function Login() {
  
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const eid = document.getElementById("eid").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById('message');
    
    try {
      const response = await axios.post('http://localhost:3001/api/user/login', { 
        eid: eid,
        password: password
      });

      if (response.status === 200) {
        // Store the token in local storage or any state management
        localStorage.setItem('token', response.data.token);
        messageElement.textContent = 'Login successful!';
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      messageElement.textContent = 'Login failed. Please check your credentials.';
    }
  };

  return (
    <div className='app-container'>
      <div className="form-container">
        <h2>Login</h2>
        <form method='post' onSubmit={handleLogin}>
          <div className="form-group">
            <label>Employee Id:</label>
            <input id="eid" type="text" name='eid' required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input id="password" type="password" name='password' required />
          </div>
          <button type="submit" className="btn">Login</button>
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
