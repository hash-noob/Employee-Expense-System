import React, { useState } from 'react';

const RemarkPopup = ({ isOpen, onClose, onSubmit }) => {
  const [remark, setRemark] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(remark);
    setRemark('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Enter Remarks</h2>
        <textarea
          className="w-full h-24 p-2 border rounded"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Write your remarks here..."
        />
        <div className="flex justify-end mt-4">
          <button className="bg-gray-500 text-white py-2 px-4 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkPopup;
