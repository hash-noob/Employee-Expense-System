// Header.js
import React from 'react';
//import './header.css'; // Assuming you have some basic CSS for styling

const Header = ({ activeTab, setActiveTab }) => {
    return (
        <div className="header">
            <div 
                className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
            >
                Pending Claims
            </div>
            <div 
                className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
            >
                Approved Claims
            </div>
            <div 
                className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
                onClick={() => setActiveTab('rejected')}
            >
                Rejected Claims
            </div>
        </div>
    );
};

export default Header;
