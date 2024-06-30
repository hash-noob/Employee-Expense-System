import React, { useDebugValue, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Claimpopup = ({ onClose, onSubmit }) => {
  const [cId, setCId] = useState('');
  const [selectedBills, setSelectedBills] = useState([]);
  const [mid, setMid] = useState('');
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [comments, setComments] = useState('');
  const [midOptions,setMidOptions] = useState([])
  const billsArray = localStorage.getItem('billsArray').split(',')
  let getManagers = async ()=>{
    const res = await axios.get("http://localhost:3001/api/user/managers")
    const managers = res.data.map((e)=> e.username )
    setMidOptions(managers)
  }

  const handleCheckboxChange = (bill) => {
    setSelectedBills((prevSelectedBills) =>
      prevSelectedBills.includes(bill)
        ? prevSelectedBills.filter((b) => b !== bill)
        : [...prevSelectedBills, bill]
    );
  };

  getManagers()
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eId = localStorage.getItem('eId')
    const status = 'pending'
    const formData = {
      eId,
      cId,
      status,
      selectedBills,
      mid,
      title,
      fromDate,
      toDate,
      comments
    };
    onSubmit(formData);
    onClose()
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-lvh overflow-scroll ">
        <h2 className="text-2xl font-bold mb-4">Add Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Customer ID (cId)</label>
            <input 
              type="text" 
              value={cId} 
              onChange={(e) => setCId(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bills Array</label>
            {billsArray.map((bill, index) => (
              <div key={index} className="flex-wrap max-w-sm">
                <input 
                  type="checkbox" 
                  id={`bill-${index}`} 
                  checked={selectedBills.includes(bill)}
                  onChange={() => handleCheckboxChange(bill)}
                  className="mr-2"
                />
                <label htmlFor={`bill-${index}`} className="text-gray-700">{bill}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Manager ID (mid)</label>
            <select 
              value={mid} 
              onChange={(e) => setMid(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            >
              <option value="">Select Merchant</option>
              {midOptions.map((merchant, index) => (
                <option key={index} value={merchant}>{merchant}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700">From Date</label>
              <DatePicker 
                selected={fromDate} 
                onChange={(date) => setFromDate(date)} 
                className="w-full px-3 py-2 border rounded" 
                required 
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700">To Date</label>
              <DatePicker 
                selected={toDate} 
                onChange={(date) => setToDate(date)} 
                className="w-full px-3 py-2 border rounded" 
                required 
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comments</label>
            <textarea 
              value={comments} 
              onChange={(e) => setComments(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              rows="3" 
              required 
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Claimpopup;
