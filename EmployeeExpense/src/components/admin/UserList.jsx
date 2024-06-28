
// import React, { useState } from 'react';
// import { useEmployee } from './EmployeeContext';
// import Popup from './Popup';
// import './admin.css';

// const UserList = () => {
//   const { employees, updateEmployee, deleteEmployee } = useEmployee();
//   const [filter, setFilter] = useState('All');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const handleEdit = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   const handleDelete = (employeeId) => {
//     deleteEmployee(employeeId);
//   };

//   const handleClosePopup = () => {
//     setSelectedEmployee(null);
//   };

//   const handleSave = (employeeId, updatedEmployee) => {
//     updateEmployee(employeeId, updatedEmployee);
//     setSelectedEmployee(null);
//   };

//   const filteredEmployees = employees.filter(employee => {
//     if (filter === 'All') return true;
//     return employee.role === filter;
//   });

//   return (
//     <div className="user-list-container">
//       <div className="user-filter">
//         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="All">All members</option>
//           <option value="user">Employees</option>
//           <option value="manager">Managers</option>
//         </select>
//       </div>
      
//       <div className="user-table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>Employee-Id</th>
//               <th>Username</th>
//               <th>Role</th>
//               <th>Phone</th>
//               <th>Options</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map(employee => (
//               <tr key={employee.eId}>
//                 <td>{employee.eId}</td>
//                 <td>{employee.username}</td>
//                 <td>{employee.role}</td>
//                 <td>{employee.mobileNumber}</td>
//                 <td>
//                   <button className="action-button" onClick={() => handleEdit(employee)}>Edit</button>
//                   <button className="action-button" onClick={() => handleDelete(employee.eId)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedEmployee && (
//         <Popup
//           employee={selectedEmployee}
//           onClose={handleClosePopup}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// };

// export default UserList;


import React, { useState } from 'react';
import { useEmployee } from './EmployeeContext';
import Popup from './Popup';
import SearchBar from './SearchBar';
import './admin.css';

const UserList = () => {
  const { employees, updateEmployee, deleteEmployee } = useEmployee();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = (employeeId) => {
    deleteEmployee(employeeId);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  const handleSave = (employeeId, updatedEmployee) => {
    updateEmployee(employeeId, updatedEmployee);
    setSelectedEmployee(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesFilter = filter === 'All' || employee.role === filter;
    const matchesSearch = employee.eId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="user-list-container">
      <div className="user-filter">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
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
                  <button className="action-button" onClick={() => handleEdit(employee)}>Edit</button>
                  <button className="action-button" onClick={() => handleDelete(employee.eId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <Popup
          employee={selectedEmployee}
          onClose={handleClosePopup}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserList;
