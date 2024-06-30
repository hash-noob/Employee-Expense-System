import React from 'react';
import { format } from 'date-fns';

const BillItem = ({ bill }) => {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="flex-1">
        <p className="text-lg font-semibold">Bill ID: {bill.billId}</p>
        <p>Amount: ${bill.billAmount}</p>
        <p>Date: {format(new Date(bill.datedOn), 'MM/dd/yyyy')}</p>
        <p>Merchant: {bill.merchant}</p>
      </div>
    </div>
  );
};

export default BillItem;
