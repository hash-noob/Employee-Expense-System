import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eid = document.getElementById("eid").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById('message');

    try {
      const response = await axios.post('http://localhost:3001/api/user/login', { eid, password });
      console.log(response)
      if (response.status === 200) {
        // Store the token in local storage or any state management
        localStorage.setItem('token', response.data.token);
        messageElement.textContent = 'Login successful!';
      }
    } catch (error) {
       console.log(error)
    }
  };

  return (
    <div className='app-container'>
      <div className="form-container">
        <h2>Login</h2>
        <p id="message"></p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="EmployeeId"
              name="eid"
              id="eid"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
