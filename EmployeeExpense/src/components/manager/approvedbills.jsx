import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovedBills = () => {
    const [bills, setBills] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovedBills = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/manager/approved-bills', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setBills(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchApprovedBills();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            
            {bills.length === 0 ? (
                <div>No approved bills found</div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-green-200">
                    <tr>
            <th
              colSpan={4}
              className="text-xl font-bold py-4 text-center border-b border-green-200">
              Approved Bills
            </th>
            
          </tr>
          <hr></hr>
                        <tr>
                            <th className="py-2 px-4">Claim ID</th>
                            <th className="py-2 px-4">Employee ID</th>
                            <th className="py-2 px-4">Comments</th>
                            <th className="py-2 px-4">Bills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <tr key={bill._id} className="border-t">
                                <td className="border px-4 py-2">{bill.cId}</td>
                                <td className="border px-4 py-2">{bill.eId}</td>
                                <td className="border px-4 py-2">{bill.comments}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {bill.billsArray.map((b, index) => (
                                            <li key={index}>
                                                Bill Id:{b.billId}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApprovedBills;
