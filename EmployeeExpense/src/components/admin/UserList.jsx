// src/UserList.js
import React, { useState } from 'react';
import { useEmployee } from './EmployeeContext';
import './admin.css';

const UserList = () => {
  const { employees, updateEmployee, deleteEmployee } = useEmployee();
  const [filter, setFilter] = useState('All');

  // const handleEdit = (employeeId) => {
  //   // Here, you would have some form to edit the employee details
  //   const updatedEmployee = { /* updated data */ };
  //   updateEmployee(employeeId, updatedEmployee);
  // };

  const handleDelete = (employeeId) => {
    deleteEmployee(employeeId);
  };

  const filteredEmployees = employees.filter(employee => {
    if (filter === 'All') return true;
    return employee.role === filter;
  });

  return (
    <div className="user-list-container">
      <div className="user-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All members</option>
          <option value="user">Employees</option>
          <option value="manager">Managers</option>
        </select>
      </div>
      
      <div className="user-table-container">
  <table className="user-table">
    <thead>
      <tr>
        <th>Employee-Id</th>
        <th>Username</th>
        <th>Role</th>
        <th>Phone</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      {filteredEmployees.map(employee => (
        <tr key={employee.eId}>
          <td>{employee.eId}</td>
          <td>{employee.username}</td>
          <td>{employee.role}</td>
          <td>{employee.mobileNumber}</td>
          <td>
            <button className="action-button" onClick={() => handleEdit(employee.eId)}>Edit</button>
            <button className="action-button" onClick={() => handleDelete(employee.eId)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
};

export default UserList;
