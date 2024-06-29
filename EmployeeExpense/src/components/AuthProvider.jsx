// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// // Create AuthContext
// const AuthContext = createContext();

// // AuthProvider component
// const AuthProvider = ({ children }) => {
//     const [eId, seteId] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [token, setToken] = useState(null);

//     const getRole = async (eId) => {
//         try {
//             const response = await axios.get(`http://localhost:3001/api/admin/${eId}`);
//             return response.data[0].role;
//         } catch (err) {
//             console.log(eId);
//             console.log(err);
//         }
//         return false;
//     }

//     const loginAction = async (eId, password) => {
//         try {
//             const response = await axios.post('http://localhost:3001/api/user/login', { 
//                 eId: eId,
//                 password: password
//             });

//             if (response.status === 200) {
//                 const token = response.data.token;
//                 localStorage.setItem('token', token);
//                 seteId(eId);
//                 localStorage.setItem('eId', eId);
//                 setToken(token);
//                 return true;
//             }
//         } catch (error) {
//             console.log(eId);
//             console.error(error);
//         }
//         return false;
//     };

//     const logout = () => {
//         seteId(null);
//         setToken(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem("eId");
//     };

//     useEffect(() => {
//         const storedToken = localStorage.getItem('token');
//         const storedUser = localStorage.getItem('eId');

//         if (storedToken && storedUser) {
//             setToken(storedToken);
//             seteId(storedUser);
//         }
//         setLoading(false);
//     }, []);

//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//         } else {
//             delete axios.defaults.headers.common["Authorization"];
//         }
//     }, [token]);

//     return (
//         <AuthContext.Provider value={{ eId, token, logout, getRole, loginAction, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// }

// export default AuthProvider;
import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance, { setAuthToken } from '../components/AxiosInstance'; // Import the Axios instance and setAuthToken function

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [eId, seteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const getRole = async (eId) => {
        try {
            const response = await axiosInstance.get(`/admin/${eId}`);
            return response.data[0].role;
        } catch (err) {
            console.log(eId);
            console.log(err);
        }
        return false;
    };

    const loginAction = async (eId, password) => {
        try {
            const response = await axiosInstance.post('/user/login', { 
                eId: eId,
                password: password
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                seteId(eId);
                localStorage.setItem('eId', eId);
                setToken(token);
                setAuthToken(token); // Set the token in Axios instance
                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    };

    const logout = () => {
        seteId(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem("eId");
        setAuthToken(null); // Remove the token from Axios instance
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('eId');

        if (storedToken && storedUser) {
            setToken(storedToken);
            seteId(storedUser);
            setAuthToken(storedToken); // Set the token in Axios instance
            console.log("Token and user set from localStorage on initial load.");
        } else {
            console.log("No token found in localStorage.");
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ eId, token, logout, getRole, loginAction, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
