import React from "react";

const AddBill = ({ onClick }) => {
    return (
    <div className="flex float-right">
      <button 
        onClick={onClick} 
        className="relative  bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-2xl"
      >
        +
      </button>
      </div>
    );
  };

export default AddBill