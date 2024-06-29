import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'
// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [eId, seteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token,setToken] = useState(null);
 
    const getRole= async(eId)=>{
      try{
        const response = await axios.get(`http://localhost:3001/api/admin/${eId}`);
         return response.data[0].role;
      } 
      catch(err){
        console.log(eId);
        console.log(err);
      }
      return false;
    }

    const loginAction = async (eId, password) => {
        
       
        // Implement actual login logic here
        const loggedInUser = eId ; // Replace this with the actual user data
        
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', { 
              eId: eId,
              password: password
            });
      
            if (response.status === 200) {
              // Store the token in local storage or any state management
              localStorage.setItem('token', response.data.token);
              seteId(loggedInUser.eId);
              localStorage.setItem('eId',loggedInUser);
              setToken(response.data.token);

              return true;
            }
          } catch (error) {
            console.log(eId);
            console.error(error);
            //messageElement.textContent = 'Login failed. Please check your credentials.';
          }
          return false;
    };

    const logout = () => {
        seteId(null);
        setToken("");
        localStorage.removeItem('token');
        localStorage.removeItem("eId");
    };

    

    useEffect(() => {
        // Check for a logged-in user on initial load
        const storedUser = localStorage.getItem('eId');
        if (storedUser) {
            seteId(storedUser);
        }
        setLoading(false);
    }, []);

 
      
    return (
        <AuthContext.Provider value={{ eId,token,logout,getRole, loginAction,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    return useContext(AuthContext);
}

export default AuthProvider

