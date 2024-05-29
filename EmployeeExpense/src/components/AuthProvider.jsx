import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'
// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [eid, setEid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token,setToken] = useState(null);
    //const navigate = useNavigate()
 
    const getRole= async(eid)=>{
      try{
        const response = await axios.get(`http://localhost:3001/api/admin/${eid}`);
         return response.data[0].role;
      } 
      catch(err){
        console.log(eid);
        console.log(err);
      }
      return false;
    }

    const loginAction = async (eid, password) => {
        
       
        // Implement actual login logic here
        const loggedInUser = { eid }; // Replace this with the actual user data
        
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', { 
              eid: eid,
              password: password
            });
      
            if (response.status === 200) {
              // Store the token in local storage or any state management
              localStorage.setItem('token', response.data.token);
              setEid(loggedInUser);
              localStorage.setItem('eid',  JSON.stringify(loggedInUser));
              setToken(response.data.token);
              //messageElement.textContent = 'Login successful!';
              //navigate('/dashboard');
              return true;
            }
          } catch (error) {
            console.log(eid);
            console.error(error);
            //messageElement.textContent = 'Login failed. Please check your credentials.';
          }
          return false;
    };

    const logout = () => {
        setEid(null);
        setToken("");
        localStorage.removeItem('token');
        localStorage.removeItem("eid");
    };

    useEffect(() => {
        // Check for a logged-in user on initial load
        const storedUser = localStorage.getItem('eid');
        if (storedUser) {
            setEid(storedUser);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem('token',token);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
        }
      }, [token]);
      
    return (
        <AuthContext.Provider value={{ eid,token,logout,getRole, loginAction,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    return useContext(AuthContext);
}

export default AuthProvider

