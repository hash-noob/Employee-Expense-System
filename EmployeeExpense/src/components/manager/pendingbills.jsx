// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PendingBills = () => {
//     const [bills, setBills] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPendingBills = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/api/manager/pending-bills', {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setBills(response.data);
//             } catch (error) {
//                 setError(error);
//             }
//         };

//         fetchPendingBills();
//     }, []);

//     if (error) {
//         return <div className="text-red-500">Error: {error.message}</div>;
//     }

//     return (
//         <div className="container mx-auto mt-10">
//             {bills.length === 0 ? (
//                 <div>No pending bills found</div>
//             ) : (
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th
//                                 colSpan={4}
//                                 className="text-xl font-bold py-4 text-center border-b border-gray-200">
//                                 Pending Bills
//                             </th>
//                         </tr>
//                         <tr>
//                             <th className="py-2 px-4">Claim ID</th>
//                             <th className="py-2 px-4">Employee ID</th>
//                             <th className="py-2 px-4">Comments</th>
//                             <th className="py-2 px-4">Bills</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bills.map((bill) => (
//                             <tr key={bill._id} className="border-t">
//                                 <td className="border px-4 py-2">{bill.cId}</td>
//                                 <td className="border px-4 py-2">{bill.eId}</td>
//                                 <td className="border px-4 py-2">{bill.comments}</td>
//                                 <td className="border px-4 py-2">
//                                     <ul>
//                                         {bill.billsArray.map((b, index) => (
//                                             <li key={index}>
//                                                 Bill ID: {b.billId}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default PendingBills;
// components/PendingBills.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BillCard from './BillCard';

const PendingBills = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingBills = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/manager/pending-bills', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBills(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPendingBills();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2>Pending Bills</h2>
      {bills.length === 0 ? (
        <div>No pending bills found</div>
      ) : (
        <div className="card-container">
          {bills.map((bill) => (
            <BillCard
              key={bill._id}
              eId={bill.eId}
              title={bill.title}
              totalAmount={bill.totalAmount}
              datedFrom={bill.datedFrom}
              datedTo={bill.datedTo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBills;
