import React, { useState } from 'react';
import './admin.css';

const Popup = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: employee.username,
    role: employee.role,
    mobileNumber: employee.mobileNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee.eId, formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Role:
            <select className="w-full px-3 py-2 border rounded"  type="text" name="role" value={formData.role} onChange={handleChange} >
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </label>
          <label>
            Phone:
            <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          </label>
          <div className="popup-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
