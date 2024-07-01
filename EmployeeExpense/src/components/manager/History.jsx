import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryCard from './HistoryCard';

const History = () => {
    
    const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
        const response = await axios.get('http://localhost:3001/api/manager/claims', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        console.log(response.data)
        setClaims(response.data);
      };
    fetchClaims();
  }, []);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="shadow-2xl p-5 ">
        <div className='flex space-x-10 '>
          <h3 className="text-xl font-semibold mb-4 " id='claims'>Claims</h3>
        </div>
        
       
                <div className=" maxi overflow-scroll">
                  {claims.map((claim, index) => (
                      <HistoryCard key={index} claim={claim} />
                  ))}
                </div>
        
    </div>
  </div>
  );
};

export default History;



  