import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BillItem from './BillItem';
import ClaimItem from './ClaimItem';

const History = () => {
    const [bills, setBills] = useState([]);
    const [claims, setClaims] = useState([]);
    const [activeSection, setActiveSection] = useState('bills');

    const handleSectionClick = (section) => {
      if(section=='bills'){
        document.getElementById('bills').style ='opacity:100% '
        document.getElementById('claims').style =' opacity:40% '
      }else{
        document.getElementById('bills').style ='opacity:40% '
        document.getElementById('claims').style =' opacity:100% '
      }
      setActiveSection(section);
  };

  useEffect(() => {
    const fetchBills = async () => {
      const response = await axios.get('http://localhost:3001/api/user/bills', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setBills(response.data);
    };

    const fetchClaims = async () => {
      const response = await axios.get('http://localhost:3001/api/user/claimsHistory', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      console.log(response.data)
      setClaims(response.data);
    };

    fetchBills();
    fetchClaims();
  }, []);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="shadow-2xl p-5 ">
        <div className='flex space-x-10 '>
          <h3 className="text-xl font-semibold mb-4 " id='bills' onClick={()=>(handleSectionClick('bills'))}>Bills</h3>
          <h3 className="text-xl font-semibold mb-4 " id='claims' onClick={()=>(handleSectionClick('claims'))}>Claims</h3>
        </div>
        {activeSection === 'bills' && 
            <div className="maxi overflow-scroll ">
                {bills.map((bill, index) => (
                    <BillItem key={index} bill={bill} />
                ))}
            </div>
        }
        {activeSection === 'claims' &&
                <div className=" maxi overflow-scroll">
                  {claims.map((claim, index) => (
                      <ClaimItem key={index} claim={claim} />
                  ))}
                </div>
        }
    </div>
  </div>
  );
};

export default History;



  