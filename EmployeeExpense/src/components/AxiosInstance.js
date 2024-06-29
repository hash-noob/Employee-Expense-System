import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // Add other default configurations if needed
});

// Function to set the Authorization header
export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;
