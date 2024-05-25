import axios from 'axios';
import React from 'react';

const BillCard = ({ bill }) => (
  <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <h3 className="text-lg font-semibold">{bill.title}</h3>
    <p className="text-gray-600">{bill.description}</p>
    <div className="mt-2">
      <a href={bill.link} className="text-blue-500 hover:underline">
        View Details
      </a>
    </div>
  </div>
);

const BillGrid = ({ bills }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Bills</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bills.map((bill, index) => (
        <BillCard key={index} bill={bill} />
      ))}
    </div>
  </div>
);


const BillContainer = () => {
  let bills=[
    {
      title : "Bill1",
      description : "omg",
      link : "link1"
    }
  ]
  const getBills= async ()=>{
    let result = await axios.get("http://localhost:3001/api/user/bills",{
      headers:{
        
      }
    })
  }

  return (
    <div className="p-6">
      <BillGrid bills={bills} />
    </div>
  );
};

export default BillContainer;
