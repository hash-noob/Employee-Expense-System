// import { createContext } from "react";
// const billsContext = createContext()
// export default billsContext
// BillsContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const BillsContext = createContext();
const BillsProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const getBills = async () => {
      const response = await axios.get("http://localhost:3001/api/user/pending-bills", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      setBills(response.data);
    };
    getBills();
  }, []);

  return (
    <BillsContext.Provider value={{ bills, setBills }}>
      {children}
    </BillsContext.Provider>
  );
};

export { BillsProvider, BillsContext };
