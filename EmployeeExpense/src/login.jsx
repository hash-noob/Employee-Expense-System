import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eid = formData.get('eid');
    const password = formData.get('password');
    const messageElement = document.getElementById('message');

    try {
      const response = await axios.post('/login', { eid, password });

      if (response.status === 200) {
        // Store the token in local storage or any state management
        localStorage.setItem('token', response.data.token);
        messageElement.textContent = 'Login successful!';
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        messageElement.textContent = error.response.data;
      } else {
        // Something else happened while setting up the request
        messageElement.textContent = 'An error occurred. Please try again.';
      }
    }
  };

  return (
    <>
    <div className='app-container'>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">  
            <input type="text" placeholder="EmployeeId" name='eid' required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password"  name='password' required />
          </div>
          <button type="submit" className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
        <p id="message"></p>
      </div>
    </div>
    </>
  );
};

export default App;