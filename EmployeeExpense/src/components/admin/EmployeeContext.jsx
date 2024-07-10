
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'

const EmployeeContext = createContext();

export const useEmployee = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);
  const [claims,setClaims] = useState([]);

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

  const saveActivitiesToLocalStorage = (activities) => {
    localStorage.setItem('activities', JSON.stringify(activities));
  };

  // Function to load activities from local storage
  const loadActivitiesFromLocalStorage = () => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  };

  useEffect(() => {
    const localActivities = loadActivitiesFromLocalStorage();
    setActivities(localActivities);
  }, []);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/claims', {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
        setClaims(response.data);
      } catch (error) {
        console.error('Failed to fetch claims:', error);
      }
    };
    fetchClaims();
  }, []);


  const addActivity = (activity) => {
    const updatedActivities = [activity, ...loadActivitiesFromLocalStorage()];
    setActivities(updatedActivities);
    saveActivitiesToLocalStorage(updatedActivities);
  };

  

  const addEmployee = async (newEmployee) => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/addUser', newEmployee);
      setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
      addActivity({ type: 'added', employee: response.data });
      console.log('added');
      return true;
    } catch (error) {
      console.error('Failed to add employee:', error);
      return false;
    }
  };
  
  const addBulkEmployees = async (users) => {
    try {
      const response = await axios.post('http://localhost:3001/api/admin/signup-bulk', users);
      setEmployees((prevEmployees) => [...response.data, ...prevEmployees]);
      users.forEach(user =>{
         user={...user,role:'user',username:user.eId}
         const activity = { type: 'added', employee: { eId: user.eId, ...user } };
        
         addActivity(activity);
        
        
        });
        return true;
      
    } catch (error) {
      console.error('Failed to add bulk employees:', error);
      return false;
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
      const deletedEmployee = await axios.get(`http://localhost:3001/api/admin/${eId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      console.log(deletedEmployee)
      let response;
      if(deletedEmployee.data[0].role==='user'){
         response = await axios.get(`http://localhost:3001/api/admin/claims/user/${eId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
      }
  
      if (deletedEmployee.data[0].role === 'manager') {
         response = await axios.get(`http://localhost:3001/api/admin/claims/manager/${eId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
      }
        const pendingClaims = response.data.filter(claim => claim.status === 'pending');
        console.log(pendingClaims)
  
        if (pendingClaims.length > 0) {
          // Reject all pending claims
          for (const claim of pendingClaims) {
            await axios.put(`http://localhost:3001/api/admin/claims/${claim.cId}`, { status: 'rejected' }, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
              }
            });
          }
          deletedEmployee.data[0].role==='manager'?alert('All pending claims for the manager have been rejected.'):alert("All pending claims of the Employee have been rejected.");
        
      }
  
      await axios.delete(`http://localhost:3001/api/admin/${eId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.eId !== eId)
      );
      addActivity({ type: 'deleted', employee: { eId, ...deletedEmployee.data[0] } });
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };
  

  return (
    <EmployeeContext.Provider value={{ employees,claims,setClaims, addEmployee,addBulkEmployees, updateEmployee, deleteEmployee, activities }}>
      {children}
    </EmployeeContext.Provider>
  );
};
