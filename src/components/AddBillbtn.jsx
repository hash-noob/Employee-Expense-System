// FloatingButton.jsx
import React from 'react';

const AddBill = ({ onClick }) => {
  return (
    <div className='min-w-full text-right'>
    <button 
      onClick={onClick} 
      className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-2xl"
    >
      +
    </button>
    </div>
  );
};

export default AddBill;
