// import React, { useEffect, useState } from 'react';
// import { Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

// const monthify = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// const ManagerStats = () => {
//   const [claimStats, setClaimStats] = useState([]);
//   const [monthlyReimbursements, setMonthlyReimbursements] = useState([]);

//   const [pie, setPie] = useState(false);
//   const [bar, setBar] = useState(false);

//   useEffect(() => {
//     // Static data for claims distribution
//     const staticClaimStats = [
//       { name: 'Pending', value: 40 },
//       { name: 'Approved', value: 30 },
//       { name: 'Rejected', value: 30 }
//     ];
//     setClaimStats(staticClaimStats);
//     setPie(true);

//     // Static data for monthly reimbursements
//     const staticMonthlyReimbursements = [
//       { _id: 'Jan', amount: 500 },
//       { _id: 'Feb', amount: 300 },
//       { _id: 'Mar', amount: 400 },
//       { _id: 'Apr', amount: 350 },
//       { _id: 'May', amount: 450 },
//       { _id: 'Jun', amount: 300 },
//       { _id: 'Jul', amount: 200 },
//       { _id: 'Aug', amount: 100 },
//       { _id: 'Sep', amount: 250 },
//       { _id: 'Oct', amount: 300 },
//       { _id: 'Nov', amount: 400 },
//       { _id: 'Dec', amount: 500 }
//     ];
//     setMonthlyReimbursements(staticMonthlyReimbursements);
//     setBar(true);
//   }, []);

//   return (
//     <div style={{ marginTop: "40px" }}>
//       <div className='mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-xl'>
//         <div className='text-center text-2xl font-bold'><h1>Statistics</h1></div>
//         <h3 className="text-xl font-semibold mb-4">Claims Distribution</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           {pie && <PieChart>
//             <Pie data={claimStats} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
//               {claimStats.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>}
//         </ResponsiveContainer>
//       </div>
//       <div className='mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-xl'>
//         <h3 className="text-xl font-semibold mb-4">Monthly Reimbursements</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           {bar && <BarChart width={730} height={250} data={monthlyReimbursements}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="_id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="amount" fill="#8884d8" />
//           </BarChart>}
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ManagerStats;
import React, { useEffect, useState } from 'react';
import { Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];
const monthify = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ManagerStats = () => {
  const [claimStats, setClaimStats] = useState([]);
  const [monthlyReimbursements, setMonthlyReimbursements] = useState([]);
  const [pie, setPie] = useState(false);
  const [bar, setBar] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/manager/stats');
        const { monthly_exps, category_exps, settled_claims } = response.data;

        // Process claimStats from category_exps (assuming categories represent claim statuses)
        const processedClaimStats = category_exps.map((entry) => ({
          name: entry._id,
          value: entry.amt
        }));
        setClaimStats(processedClaimStats);
        setPie(true);

        // Process monthlyReimbursements from monthly_exps
        const processedMonthlyReimbursements = monthly_exps.map((entry) => ({
          _id: monthify[entry._id - 1],
          amount: entry.bills // assuming 'bills' represent monthly reimbursements
        })).sort((a, b) => monthify.indexOf(a._id) - monthify.indexOf(b._id));
        setMonthlyReimbursements(processedMonthlyReimbursements);
        setBar(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <div className='mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-xl'>
        <div className='text-center text-2xl font-bold'><h1>Statistics</h1></div>
        <h3 className="text-xl font-semibold mb-4">Claims Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          {pie && <PieChart>
            <Pie data={claimStats} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
              {claimStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>}
        </ResponsiveContainer>
      </div>
      <div className='mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-xl'>
        <h3 className="text-xl font-semibold mb-4">Monthly Reimbursements</h3>
        <ResponsiveContainer width="100%" height={300}>
          {bar && <BarChart width={730} height={250} data={monthlyReimbursements}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManagerStats;
