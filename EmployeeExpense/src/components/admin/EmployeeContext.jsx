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
        const response = await axios.get('http://localhost:3001/api/admin',{
          headers :{
            Authorization:"Bearer "+localStorage.getItem('token')
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };
    fetchActivities();
  }, []);

  const addActivity = async (activity) => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/activities', activity);
      setActivities((prevActivities) => [response.data, ...prevActivities]);
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
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
      await axios.put(`http://localhost:3001/api/admin/${eId}`, updatedEmployee);
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
      await axios.delete(`http://localhost:3001/api/admin/${eId}`,{
        headers :{
          Authorization:"Bearer "+localStorage.getItem('token')
        }
      });
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.eId !== eId)
      );
      addActivity({ type: 'deleted', employee: { eId } });
      console.error('Failed to delete employee:', error);
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, activities }}>
      {children}
    </EmployeeContext.Provider>
  );
};
