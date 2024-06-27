// EmployeeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const useEmployee = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin');
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const addActivity = (activity) => {
    setActivities((prevActivities) => [activity, ...prevActivities]);
  };

  const addEmployee = async (newEmployee) => {
    try {
      const response = await axios.post('http://localhost:3001/api/user/signup', newEmployee);
      setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
      addActivity({ type: 'added', employee: response.data });
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  const updateEmployee = async (eId, updatedEmployee) => {
    try {
      await axios.put(`http://localhost:3001/api/user/${eId}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.eId === eId ? { ...employee, ...updatedEmployee } : employee
        )
      );
      addActivity({ type: 'updated', employee: { eId, ...updatedEmployee } });
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const deleteEmployee = async (eId) => {
    try {
      await axios.delete(`http://localhost:3001/api/user/${eId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.eId !== eId)
      );
      addActivity({ type: 'deleted', employee: { eId } });
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, activities }}>
      {children}
    </EmployeeContext.Provider>
  );
};
