import React, { useState } from 'react';
import BillCard from './BillCard';

const BillGrid = ({ bills }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
      <h2 className="text-xl font-semibold mb-4">Bills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill, index) => (
          <BillCard key={index} bill={bill} />
        ))}
      </div>
    </div>
  );
}

export default BillGrid;
