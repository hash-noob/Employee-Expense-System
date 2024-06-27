// FloatingButton.jsx
import React from 'react';

const FloatingButton = ({onClick}) => {
  return (
    <div className="relative  text-center w-full p-4">
      <button className="w-60 bg-light-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={onClick}>
        View All Users
      </button>
    </div>
  );
};

export default FloatingButton;
