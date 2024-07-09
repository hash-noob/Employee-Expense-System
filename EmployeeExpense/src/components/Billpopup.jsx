import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BillPopup({ onClose, onSubmit }){
  const [billId, setBillId] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billImage, setBillImage] = useState();
  const [category, setCategory] = useState('');
  const [merchant, setMerchant] = useState('');
  const [remark, setRemark] = useState('');
  const [datedOn, setDatedOn] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleFileChange = (e) => {
    setBillImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let eId = localStorage.getItem('eId')
    let status ='pending'
    const formData = {
      eId,
      billId,
      billAmount,
      billImage,
      category,
      merchant,
      remark,
      datedOn,
      status,
      paymentMethod
    };
    onSubmit(formData);
    onClose()
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-lvh overflow-scroll  ">
        <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Bill ID</label>
            <input 
              type="text" 
              value={billId} 
              onChange={(e) => setBillId(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bill Amount</label>
            <input 
              type="text" 
              value={billAmount} 
              onChange={(e) => setBillAmount(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Upload Bill</label>
            <input 
              type="file" 
              accept=".pdf, .jpg, .jpeg, .png" 
              onChange={handleFileChange} 
              className="w-full px-3 py-2 border rounded" 
            />
          
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="accommodation">Accommodation</option>
              <option value="medical">Medical</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Merchant</label>
            <input 
              type="text" 
              value={merchant} 
              onChange={(e) => setMerchant(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Remark</label>
            <textarea 
              value={remark} 
              onChange={(e) => setRemark(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              rows="3" 
              required 
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dated On</label>
            <DatePicker 
              selected={datedOn} 
              onChange={(date) => setDatedOn(date)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="w-full px-3 py-2 border rounded" 
              required 
            >
              <option value="">Select Payment Method</option>
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="flex">
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

export default BillPopup;


// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function BillPopup({ onClose, onSubmit }) {
//   const [billId, setBillId] = useState('');
//   const [billAmount, setBillAmount] = useState('');
//   const [billImage, setBillImage] = useState(null);
//   const [category, setCategory] = useState('');
//   const [merchant, setMerchant] = useState('');
//   const [remark, setRemark] = useState('');
//   const [datedOn, setDatedOn] = useState(new Date());
//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handleFileChange = (e) => {
//     setBillImage(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let eId = localStorage.getItem('eId')
//     let status = 'pending'
//     const formData = {
//       eId,
//       billId,
//       billAmount,
//       billImage,
//       category,
//       merchant,
//       remark,
//       datedOn,
//       status,
//       paymentMethod
//     };
//     onSubmit(formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-lvh overflow-scroll">
//         <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Bill ID</label>
//             <input
//               type="text"
//               value={billId}
//               onChange={(e) => setBillId(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Bill Amount</label>
//             <input
//               type="text"
//               value={billAmount}
//               onChange={(e) => setBillAmount(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Upload Bill</label>
//             <input
//               type="file"
//               accept=".pdf, .jpg"
//               onChange={handleFileChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="food">Food</option>
//               <option value="travel">Travel</option>
//               <option value="accommodation">Accommodation</option>
//               <option value="medical">Medical</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Merchant</label>
//             <input
//               type="text"
//               value={merchant}
//               onChange={(e) => setMerchant(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Remark</label>
//             <textarea
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               rows="3"
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Dated On</label>
//             <DatePicker
//               selected={datedOn}
//               onChange={(date) => setDatedOn(date)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Payment Method</label>
//             <select
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full px-3 py-2 border rounded"
//               required
//             >
//               <option value="">Select Payment Method</option>
//               <option value="upi">UPI</option>
//               <option value="cash">Cash</option>
//               <option value="card">Card</option>
//             </select>
//           </div>
//           <div className="flex">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BillPopup;




// // import React, { useState } from 'react';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import axios from 'axios';

// // function BillPopup({ onClose, onSubmit }) {
// //   const [billId, setBillId] = useState('');
// //   const [billAmount, setBillAmount] = useState('');
// //   const [billImage, setBillImage] = useState(null);
// //   const [category, setCategory] = useState('');
// //   const [merchant, setMerchant] = useState('');
// //   const [remark, setRemark] = useState('');
// //   const [datedOn, setDatedOn] = useState(new Date());
// //   const [paymentMethod, setPaymentMethod] = useState('');

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setBillImage(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     let eId = localStorage.getItem('eId');
// //     let status = 'pending';

// //     const formData = {
// //       eId,
// //       billId,
// //       billAmount,
// //       billImage,
// //       category,
// //       merchant,
// //       remark,
// //       datedOn,
// //       status,
// //       paymentMethod
// //     };

// //     axios.post('http://localhost:3001/api/user/bills', formData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: 'Bearer ' + localStorage.getItem('token')
// //       }
// //     })
// //     .then(response => {
// //       console.log(response.data);
// //       onClose();
// //     })
// //     .catch(error => {
// //       console.error('There was an error submitting the bill!', error);
// //     });
// //   };

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
// //       <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-lvh overflow-scroll">
// //         <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Bill ID</label>
// //             <input 
// //               type="text" 
// //               value={billId} 
// //               onChange={(e) => setBillId(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Bill Amount</label>
// //             <input 
// //               type="text" 
// //               value={billAmount} 
// //               onChange={(e) => setBillAmount(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Upload Bill</label>
// //             <input 
// //               type="file" 
// //               accept=".pdf, .jpg" 
// //               onChange={handleFileChange} 
// //               className="w-full px-3 py-2 border rounded" 
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Category</label>
// //             <select 
// //               value={category} 
// //               onChange={(e) => setCategory(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             >
// //               <option value="">Select Category</option>
// //               <option value="food">Food</option>
// //               <option value="travel">Travel</option>
// //               <option value="accommodation">Accommodation</option>
// //               <option value="medical">Medical</option>
// //             </select>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Merchant</label>
// //             <input 
// //               type="text" 
// //               value={merchant} 
// //               onChange={(e) => setMerchant(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Remark</label>
// //             <textarea 
// //               value={remark} 
// //               onChange={(e) => setRemark(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               rows="3" 
// //               required 
// //             ></textarea>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Dated On</label>
// //             <DatePicker 
// //               selected={datedOn} 
// //               onChange={(date) => setDatedOn(date)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block text-gray-700">Payment Method</label>
// //             <select 
// //               value={paymentMethod} 
// //               onChange={(e) => setPaymentMethod(e.target.value)} 
// //               className="w-full px-3 py-2 border rounded" 
// //               required 
// //             >
// //               <option value="">Select Payment Method</option>
// //               <option value="upi">UPI</option>
// //               <option value="cash">Cash</option>
// //               <option value="card">Card</option>
// //             </select>
// //           </div>
// //           <div className="flex">
// //             <button 
// //               type="button" 
// //               onClick={onClose} 
// //               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
// //             >
// //               Cancel
// //             </button>
// //             <button 
// //               type="submit" 
// //               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //             >
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BillPopup;







// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// function BillPopup({ onClose, onSubmit }) {
//   const [billId, setBillId] = useState('');
//   const [billAmount, setBillAmount] = useState('');
//   const [billImage, setBillImage] = useState(null);
//   const [category, setCategory] = useState('');
//   const [merchant, setMerchant] = useState('');
//   const [remark, setRemark] = useState('');
//   const [datedOn, setDatedOn] = useState(new Date());
//   const [paymentMethod, setPaymentMethod] = useState('');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBillImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let eId = localStorage.getItem('eId');
//     let status = 'pending';

//     const formData = {
//       eId,
//       billId,
//       billAmount,
//       billImage,
//       category,
//       merchant,
//       remark,
//       datedOn,
//       status,
//       paymentMethod
//     };

//     axios.post('http://localhost:3001/api/user/bills', formData, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem('token')
//       }
//     })
//     .then(response => {
//       console.log(response.data);
//       onClose();
//     })
//     .catch(error => {
//       console.error('There was an error submitting the bill!', error);
//     });
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
//       <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-lvh overflow-scroll">
//         <h2 className="text-2xl font-bold mb-4">Add Bill</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Bill ID</label>
//             <input 
//               type="text" 
//               value={billId} 
//               onChange={(e) => setBillId(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Bill Amount</label>
//             <input 
//               type="text" 
//               value={billAmount} 
//               onChange={(e) => setBillAmount(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Upload Bill</label>
//             <input 
//               type="file" 
//               accept=".pdf, .jpg" 
//               onChange={handleFileChange} 
//               className="w-full px-3 py-2 border rounded" 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Category</label>
//             <select 
//               value={category} 
//               onChange={(e) => setCategory(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             >
//               <option value="">Select Category</option>
//               <option value="food">Food</option>
//               <option value="travel">Travel</option>
//               <option value="accommodation">Accommodation</option>
//               <option value="medical">Medical</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Merchant</label>
//             <input 
//               type="text" 
//               value={merchant} 
//               onChange={(e) => setMerchant(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Remark</label>
//             <textarea 
//               value={remark} 
//               onChange={(e) => setRemark(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               rows="3" 
//               required 
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Dated On</label>
//             <DatePicker 
//               selected={datedOn} 
//               onChange={(date) => setDatedOn(date)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Payment Method</label>
//             <select 
//               value={paymentMethod} 
//               onChange={(e) => setPaymentMethod(e.target.value)} 
//               className="w-full px-3 py-2 border rounded" 
//               required 
//             >
//               <option value="">Select Payment Method</option>
//               <option value="upi">UPI</option>
//               <option value="cash">Cash</option>
//               <option value="card">Card</option>
//             </select>
//           </div>
//           <div className="flex">
//             <button 
//               type="button" 
//               onClick={onClose} 
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BillPopup;
