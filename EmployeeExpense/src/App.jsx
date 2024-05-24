import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <div className='app-container'>
      <div className="form-container">
        <h2>Login</h2>
        <form action='http://localhost:3001/api/user/login' method='POST' >
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name='email' required />
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
      </div>
      </div>
    </>
  )
}

export default App
