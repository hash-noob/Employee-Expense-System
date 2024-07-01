 import React, { useState } from 'react';
import './manager.css'; // Assuming you have some basic CSS for styling

const billsData = {
    pending: [
        { id: 'pencil', amount: 4000, date: '01/01/1970', merchant: 'fghi' },
        { id: 'erasor', amount: 6000, date: '01/01/1970', merchant: 'fghi' },
        { id: 'sharpener', amount: 2000, date: '01/01/1970', merchant: 'fghi' }
    ],
    accepted: [
        { id: 'notebook', amount: 5000, date: '02/01/1970', merchant: 'jklm' }
    ],
    rejected: [
        { id: 'pen', amount: 1000, date: '03/01/1970', merchant: 'nopq' }
    ]
};

const MainContent = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const renderBills = (bills) => {
        return bills.map(bill => (
            <div className="card" key={bill.id}>
                <h3>Bill ID: {bill.id}</h3>
                <p>Amount: ${bill.amount}</p>
                <p>Date: {bill.date}</p>
                <p>Merchant: {bill.merchant}</p>
            </div>
        ));
    };

    return (
        <div className="manager-main-content">
            <div className="header">
                <div 
                    className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Bills
                </div>
                <div 
                    className={`tab ${activeTab === 'accepted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('accepted')}
                >
                    Accepted Bills
                </div>
                <div 
                    className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rejected')}
                >
                    Rejected Bills
                </div>
            </div>
            <div className="content">
                {activeTab === 'pending' && renderBills(billsData.pending)}
                {activeTab === 'accepted' && renderBills(billsData.accepted)}
                {activeTab === 'rejected' && renderBills(billsData.rejected)}
            </div>
        </div>
    );
};

export default MainContent;
