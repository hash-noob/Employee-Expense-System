import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimModal from './claimmodal';

const ManageBills = ({ onApprove, onReject }) => {
    const [claims, setClaims] = useState([]);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingClaims = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/manager/pending-bills', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setClaims(response.data);
            } catch (error) {
                setError(error);
            }
        };

        fetchPendingClaims();
    }, []);

    const handleManageClick = (claim) => {
        setSelectedClaim(claim);
    };

    const handleCloseModal = () => {
        setSelectedClaim(null);
    };
    const handleApprove = async (claim) => {
        try {
            // Call API to update claim status to Approved
            await axios.put(`http://localhost:3001/api/manager/claimbyid/${claim.cId}`, {
                status: 'approved'
            });

            // Update local state to remove approved claim
            setClaims(claims.filter(c => c._id !== claim._id));

            // Invoke parent callback
            onApprove(claim);

        } catch (error) {
            setError(error);
        }
        handleCloseModal();
    };

    // const handleApprove = (claim) => {
    //     onApprove(claim);
    //     handleCloseModal();
    // };

    // const handleReject = (claim) => {
    //     onReject(claim);
    //     handleCloseModal();
    // };
    const handleReject = async (claim) => {
        try {
            await axios.put(
                `http://localhost:3001/api/manager/claimbyid/${claim.cId}`,
                { status: 'rejected' },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            setClaims(claims.filter((c) => c._id !== claim._id));

            onReject(claim);
        } catch (error) {
            setError(error);
        }
        handleCloseModal();
    };

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            {claims.length === 0 ? (
                <div>No pending claims found</div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th colSpan={5} className="text-xl font-bold py-4 text-center border-b border-gray-200">
                                Pending Claims
                            </th>
                        </tr>
                        <tr>
                            <th className="py-2 px-4">Claim ID</th>
                            <th className="py-2 px-4">Employee ID</th>
                            <th className="py-2 px-4">Comments</th>
                            <th className="py-2 px-4">Bills</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map((claim) => (
                            <tr key={claim._id} className="border-t">
                                <td className="border px-4 py-2">{claim.cId}</td>
                                <td className="border px-4 py-2">{claim.eId}</td>
                                <td className="border px-4 py-2">{claim.comments}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {claim.billsArray.map((b, index) => (
                                            <li key={index}>
                                                Bill ID: {b.billId}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleManageClick(claim)}
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedClaim && (
                <ClaimModal
                    claim={selectedClaim}
                    onClose={handleCloseModal}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default ManageBills;