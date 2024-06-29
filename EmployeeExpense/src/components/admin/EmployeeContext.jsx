// // EmployeeContext.js
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// import { useAuth } from '../AuthProvider';

// const EmployeeContext = createContext();

// export const useEmployee = () => {
//   return useContext(EmployeeContext);
// };

// export const EmployeeProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const { token } = useAuth();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/admin');
//         setEmployees(response.data);
//       } catch (error) {
//         console.error('Failed to fetch employees:', error);
//       }
//     };
//     fetchEmployees();
//   }, [token]);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/admin/activities');
//         setActivities(response.data);
//       } catch (error) {
//         console.error('Failed to fetch activities:', error);
//       }
//     };
//     fetchActivities();
//   }, [token]);

//   const addActivity = async (activity) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/admin/activities', activity);
//       setActivities((prevActivities) => [response.data, ...prevActivities]);
//     } catch (error) {
//       console.error('Failed to add activity:', error);
//     }
//   };

//   const addEmployee = async (newEmployee) => {
//     try {
//       const response = await axios.post('http://localhost:3001/api/user/signup', newEmployee);
//       setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
//       addActivity({ type: 'added', employee: response.data });
//     } catch (error) {
//       console.error('Failed to add employee:', error);
//     }
//   };

//   const updateEmployee = async (eId, updatedEmployee) => {
//     try {
//       await axios.put(`http://localhost:3001/api/admin/${eId}`, updatedEmployee);
//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee.eId === eId ? { ...employee, ...updatedEmployee } : employee
//         )
//       );
//       addActivity({ type: 'updated', employee: { eId, ...updatedEmployee } });
//     } catch (error) {
//       console.error('Failed to update employee:', error);
//     }
//   };

//   const deleteEmployee = async (eId) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/admin/${eId}`);
//       setEmployees((prevEmployees) =>
//         prevEmployees.filter((employee) => employee.eId !== eId)
//       );
//       addActivity({ type: 'deleted', employee: { eId } });
//       console.error('Failed to delete employee:', error);
//     }
//     catch(e){
//       console.log(e);
//     }
//   };

//   return (
//     <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, activities }}>
//       {children}
//     </EmployeeContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../AxiosInstance'; // Import the Axios instance

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
        const response = await axiosInstance.get('/admin',{
          headers:{
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

  const addActivity = (activity) => {
    const updatedActivities = [activity, ...loadActivitiesFromLocalStorage()];
    setActivities(updatedActivities);
    saveActivitiesToLocalStorage(updatedActivities);
  };

  

  const addEmployee = async (newEmployee) => {
    try {
      const response = await axiosInstance.post('/user/signup', newEmployee);
      if(response.status!=200) throw error;
      setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
      addActivity({ type: 'added', employee: response.data });
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };
  
  const addBulkEmployees = async (users) => {
    try {
      const response = await axiosInstance.post('/admin/signup-bulk', users);
      setEmployees((prevEmployees) => [...response.data, ...prevEmployees]);
      users.forEach(user =>{
         user={...user,role:'user',username:user.eId}
         const activity = { type: 'added', employee: { eId: user.eId, ...user } };
        
         addActivity(activity);
        
        
        });
      
    } catch (error) {
      console.error('Failed to add bulk employees:', error);
    }
  };

  const updateEmployee = async (eId, updatedEmployee) => {
    try {
      await axiosInstance.put(`/admin/${eId}`, updatedEmployee);
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
      const delUser = await axiosInstance.delete(`/admin/${eId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.eId !== eId)
      );
      addActivity({ type: 'deleted', employee: delUser });
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee,addBulkEmployees, updateEmployee, deleteEmployee, activities }}>
      {children}
    </EmployeeContext.Provider>
  );
};
