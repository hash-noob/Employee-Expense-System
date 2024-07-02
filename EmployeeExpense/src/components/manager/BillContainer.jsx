


// import axios from 'axios';
// import React, { useEffect } from 'react';
// import BillGrid from './BillGrid';

// const BillContainer = ({ bills, setBills }) => {
//   const token = localStorage.getItem('token');

//   const getBills = async () => {
//     const response = await axios.get("http://localhost:3001/api/manager/pending-bills", {
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     });
//     const billsArray = response.data[0].billsArray;
//     let temp = response.data[0].billsArray.map(async(i) => {
//         const response=await axios.get(`http://localhost:3001/api/manager/${i}`);
//         console.log(response.data[0]);
//         return({
//             billId: response.data[0].billId,
//       billAmount: response.data[0].billAmount,
//       category: response.data[0].category,
//       merchant: response.data[0].merchant,
//       remark: response.data[0].remark,
//       datedOn: response.data[0].datedOn,
//       paymentMethod: response.data[0].paymentMethod
//     })
      
//     });
    
//     temp.then(data=>setBills(data));
//     console.log(bills);
    
//     localStorage.setItem('billsArray', billsArray);
//   }

//   useEffect(() => {
//     getBills();
//   }, []);

//   const onSubmit = async (formData) => {
//     try {
//       const res = await axios.post("http://localhost:3001/api/user/bills", formData);
//       if (res.status === 200) {
//         setBills([...bills, {
//           billId: res.data.billId,
//           billAmount: res.data.billAmount,
//           category: res.data.category,
//           merchant: res.data.merchant,
//           remark: res.data.remark,
//           datedOn: res.data.datedOn,
//           paymentMethod: res.data.paymentMethod
//         }]);
//         const billsArray = bills.map(e => e.billId);
//         localStorage.setItem('billsArray', billsArray);
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Bill with given id already exists or BillAmount is not numeric");
//     }
//   }

//   return (
//     <div className="p-6">
//       <BillGrid bills={bills} onSubmit={onSubmit} />
//     </div>
//   );
// };

// export default BillContainer;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BillGrid from './BillGrid';

const BillContainer = ({ bills, setBills }) => {
  const token = localStorage.getItem('token');
//   const getBills = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/api/manager/pending-bills", {
//         headers: {
//           Authorization: "Bearer " + token
//         }
//       });

//       const pendingClaims = response.data;
//       const promises = pendingClaims.map(async (claim) => {
//         // Fetch each bill's details based on the billsArray in the claim
//         const billPromises = claim.billsArray.map(async (billId) => {
//           const billResponse = await axios.get(`http://localhost:3001/api/manager/pencil`);
//           return {
//             billId: billResponse.data.billId,
//             billAmount: billResponse.data.billAmount,
//             category: billResponse.data.category,
//             merchant: billResponse.data.merchant,
//             remark: billResponse.data.remark,
//             datedOn: billResponse.data.datedOn,
//             paymentMethod: billResponse.data.paymentMethod
//           };
//         });

//         // Resolve all bill promises for this claim
//         const resolvedBills = await Promise.all(billPromises);
//         return resolvedBills;
//       });

//       // Resolve all claims' bill promises
//       const allBills = await Promise.all(promises);
//       // Flatten the array of arrays into a single array of bills
//       const flattenedBills = allBills.flat();
//       setBills(flattenedBills);
//     } catch (error) {
//       console.error("Error fetching bills:", error);
//     }
//   };

  const getBills = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/manager/pending-bills", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const pendingClaims = response.data;
      const promises = pendingClaims.map(async (claim) => {
        const billResponse = await axios.get(`http://localhost:3001/api/manager/pencil`);
        return {
          billId: billResponse.data[0].billId,
          billAmount: billResponse.data[0].billAmount,
          category: billResponse.data[0].category,
          merchant: billResponse.data[0].merchant,
          remark: billResponse.data[0].remark,
          datedOn: billResponse.data[0].datedOn,
          paymentMethod: billResponse.data[0].paymentMethod
        };
      });

      const resolvedBills = await axios.all(promises);
      setBills(resolvedBills);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3001/api/user/bills", formData);
      if (res.status === 200) {
        setBills([
          ...bills,
          {
            billId: res.data.billId,
            billAmount: res.data.billAmount,
            category: res.data.category,
            merchant: res.data.merchant,
            remark: res.data.remark,
            datedOn: res.data.datedOn,
            paymentMethod: res.data.paymentMethod
          }
        ]);
        const billsArray = bills.map(e => e.billId);
        localStorage.setItem('billsArray', billsArray);
      }
    } catch (err) {
      console.error(err);
      alert("Bill with given id already exists or BillAmount is not numeric");
    }
  };

  return (
    <div className="p-6">
      <BillGrid bills={bills} onSubmit={onSubmit} />
    </div>
  );
};

export default BillContainer;
