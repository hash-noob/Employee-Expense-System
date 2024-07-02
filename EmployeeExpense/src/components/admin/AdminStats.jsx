// StatisticsPage.jsx
import React from 'react';
import { Legend,Bar,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell ,BarChart} from 'recharts';
import Sidebar from './Sidebar.jsx';

const data = [
  { month: 'Jan', expense: 40 },
  { month: 'Feb', expense: 30 },
  { month: 'Mar', expense: 20 },
  { month: 'Apr', expense: 27 },
  { month: 'May', expense: 18 },
  { month: 'Jun', expense: 23 },
  { month: 'Jul', expense: 34 },
  { month: 'Aug', expense: 20 },
  { month: 'Sep', expense: 27 },
  { month: 'Oct', expense: 18 },
  { month: 'Nov', expense: 23 },
  { month: 'Dec', expense: 34 },
];

const expenseTypes = [
  { name: 'Food', value: 400 },
  { name: 'Travel', value: 300 },
  { name: 'Accommodation', value: 300 },
  { name: 'Medical', value: 200 },
  { name: 'Other', value: 200 }
];

const userData = [
  {
    "month": "Jan",
    "bills": 4000,
    "claims": 2400
  },
  {
    "month": "Feb",
    "bills": 3000,
    "claims": 1398
  },
  {
    "month": "Mar",
    "bills": 2000,
    "claims": 9800
  },
  {
    "month": "Apr",
    "bills": 2780,
    "claims": 3908
  },
  {
    "month": "May",
    "bills": 1890,
    "claims": 4800
  },
  {
    "month": "Jun",
    "bills": 2390,
    "claims": 3800
  },
  {
    "month": "Jul",
    "bills": 3490,
    "claims": 4300
  }
]



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#red'];

const AdminStats = () => {
  const totalExpenses = data.reduce((acc, item) => acc + item.expense, 0);
  const averageMonthlyExpense = (totalExpenses / data.length).toFixed(2);
  const acceptancePercentage = ((5 / 7) * 100).toFixed(2); // Example calculation

  return (
    <div className='flex'>
      <Sidebar/>
    <div className='main-content1'>
    <div className=" m-5  p-6 bg-white rounded-lg shadow-md hover:shadow-lg bg-gra-01 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Statistics</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Details</h3>
        <div className='flex justify-between'>
          <div className='bg-white rounded-lg shadow-md p-5 font-sans'>
            Average Monthly Expense:
            <div className='font-bold text-4xl p-3 text-center my-2'>
             ${averageMonthlyExpense}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-5 font-sans'>
            Average Monthly Claims:
            <div className='font-bold text-4xl p-3 text-center my-2'>
             {4.5} claims
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-5 font-sans '>
              Acceptance Percentage of Claims:
              <div className='font-bold text-4xl p-3 text-center my-2'>
                  {acceptancePercentage}% 
             </div>
          </div>
        </div>
      </div>
      <div className='mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl'> 
      <h3 className="text-xl font-semibold mb-4">Bills vs Claims</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart width={730} height={250} data={userData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="claims" fill="#8884d8" />
          <Bar dataKey="bills" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Expense Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={expenseTypes} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
              {expenseTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Claims Reimbersed by company</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="expense" stroke="#8884d8" fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AdminStats;
