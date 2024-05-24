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

// Example usage within a parent component
const BillContainer = () => {
  const bills = [
    {
      title: 'Bill 1',
      description: 'Description of bill 1',
      link: '#',
    },
    {
      title: 'Bill 2',
      description: 'Description of bill 2',
      link: '#',
    },
    {
      title: 'Bill 3',
      description: 'Description of bill 3',
      link: '#',
    },
    {
      title: 'Bill 4',
      description: 'Description of bill 4',
      link: '#',
    },
    {
      title: 'Bill 5',
      description: 'Description of bill 5',
      link: '#',
    },
    // Add more bills as needed
  ];

  return (
    <div className="p-6">
      <BillGrid bills={bills} />
    </div>
  );
};

export default BillContainer;
