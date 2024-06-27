// AddUsers.js
import React, { useState, useEffect } from 'react';
import { useEmployee } from './EmployeeContext';
import axios from 'axios';
import './admin.css';
import '../App.css';

function AddUsers() {
  const { addEmployee } = useEmployee();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAddUser = async (e, role) => {
    e.preventDefault();
    const form = e.target;
    const eId = form.querySelector("#eId").value;
    const email = form.querySelector("#mail").value;
    const mobileNumber = form.querySelector("#Mnumber").value;

    try {
      await addEmployee({ eId, email, "password": eId, role, mobileNumber ,"username":eId});
      setMessage(role === 'user' ? 'User added successfully!' : 'Manager added successfully!');
      //onAddNewUser({ eId, role }); // Pass the necessary user data
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage(role === 'user' ? 'Error: User already exists or there was an issue.' : 'Error: Manager already exists or there was an issue.');
    }
    form.reset();
  };

  return (
    <div>
      <div className='card-container-dashboard'>
        <div className='card-heading-dashboard'>
          <h1>Add New <span>User</span></h1>
          <button style={{ width: 'max-content' }} className="btn">Add Bulk Users</button>
        </div>
        <form method='post' onSubmit={(e) => handleAddUser(e, 'user')}>
          <input id="eId" type="text" name='eId' placeholder='Employee-Id' className="form-group" required />
          <div className="form-group">
            <input id="mail" type="email" name='email' placeholder='Employee-MailId' required />
          </div>
          <div className="form-group">
            <input id="Mnumber" type="number" name='Mnumber' placeholder='Employee-MobileNumber' required />
          </div>
          <button type="submit" className="btn">Add</button>
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
          <button style={{ width: 'max-content' }} className="btn btn-w">Add Bulk Managers</button>
        </div>
        <form method='post' onSubmit={(e) => handleAddUser(e, 'manager')}>
          <div className="form-group">
            <input id="eId" type="text" name='eId' placeholder='Manager-Id' required />
          </div>
          <div className="form-group">
            <input id="mail" type="email" name='email' placeholder='Manager-MailId' required />
          </div>
          <div className="form-group">
            <input id="Mnumber" type="number" name='Mnumber' placeholder='Manager-MobileNumber' required />
          </div>
          <button type="submit" className="btn-w btn">Add</button>
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
