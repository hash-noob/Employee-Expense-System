import React from 'react';

const ClaimModal = ({ claim, onClose, onApprove, onReject }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Manage Claim</h2>
                <div>
                    <p><strong>Claim ID:</strong> {claim.cId}</p>
                    <p><strong>Employee ID:</strong> {claim.eId}</p>
                    <p><strong>Comments:</strong> {claim.comments}</p>
                    <p><strong>Bills:</strong></p>
                    <ul>
                        {claim.billsArray.map((b, index) => (
                            <li key={index}>Bill ID: {b.billId}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => onApprove(claim)}
                    >
                        Approve
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => onReject(claim)}
                    >
                        Reject
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimModal;
