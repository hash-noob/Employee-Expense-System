// StatisticsPage.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { month: 'Jan', expense: 400 },
  { month: 'Feb', expense: 300 },
  { month: 'Mar', expense: 200 },
  { month: 'Apr', expense: 278 },
  { month: 'May', expense: 189 },
  { month: 'Jun', expense: 239 },
  { month: 'Jul', expense: 349 },
  { month: 'Aug', expense: 200 },
  { month: 'Sep', expense: 278 },
  { month: 'Oct', expense: 189 },
  { month: 'Nov', expense: 239 },
  { month: 'Dec', expense: 349 },
];

const expenseTypes = [
  { name: 'Food', value: 400 },
  { name: 'Travel', value: 300 },
  { name: 'Accommodation', value: 300 },
  { name: 'Medical', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatisticsPage = () => {
  const totalExpenses = data.reduce((acc, item) => acc + item.expense, 0);
  const averageMonthlyExpense = (totalExpenses / data.length).toFixed(2);
  const acceptancePercentage = ((5 / 7) * 100).toFixed(2); // Example calculation

  return (
    <div className=" m-5  p-6 bg-white rounded-lg shadow-md hover:shadow-lg bg-gra-01">
      <h2 className="text-2xl font-bold mb-4 text-center">Statistics</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Details</h3>
        <p>Average Monthly Expense:  Rs.{averageMonthlyExpense}</p>
        <p>Acceptance Percentage of Claims: {acceptancePercentage}%</p>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
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
    </div>
  );
};

export default StatisticsPage;
