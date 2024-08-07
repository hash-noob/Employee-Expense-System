// StatisticsPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthify = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Oct','Nov','Dec'];


const expenseTypes = [
  { name: 'Food', value: 400 },
  { name: 'Travel', value: 300 },
  { name: 'Accommodation', value: 300 },
  { name: 'Medical', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#B319E8'];

const StatisticsPage = () => {

  const [monthlyData,setMonthlyData] = useState() 
  const [totalExpenses,setTotalExpenses] = useState()
  const [averageMonthlyExpense,setAverageMonthlyExpense] = useState()
  const [categoryExpense,setCategoryExpense] = useState()
  const [showPiechart,setShowPiechart] = useState(false)

  useEffect(()=>{
    console.log(categoryExpense)
    if(categoryExpense)
      setShowPiechart(true)
  },[categoryExpense])

  useEffect(()=>{
    if(monthlyData){
      setTotalExpenses(monthlyData.reduce((total,current)=>{return total+current.amt},0))
    }
  },[monthlyData])

  useEffect(()=>{
    if(totalExpenses && monthlyData )
      setAverageMonthlyExpense((totalExpenses / monthlyData.length).toFixed(2))
    },[totalExpenses])

  useEffect(()=>{
    const fetchStats = async ()=>{
        try{const res = await axios.get('http://localhost:3001/api/user/statistics',{
          headers:{
            Authorization : "Bearer "+localStorage.getItem('token')
          }
        })
        let {monthly_exps:monthData,category_exps:categoryData} = res.data
        setMonthlyData(monthData.map((ele)=>({_id : monthify[ele._id-1],amt : ele.amt})))
        setCategoryExpense(categoryData)
      }catch(err){
        console.log(err)
      }
    }
    fetchStats()
  },[])
  
  const acceptancePercentage = ((5 / 7) * 100).toFixed(2); // Example calculation

  return (
    <div className=" m-5  p-6 bg-white rounded-lg shadow-md hover:shadow-lg bg-gra-01">
      <h2 className="text-2xl font-bold mb-4 text-center">Statistics</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Details</h3>
        <p>Total Expense:  Rs.{totalExpenses}</p>
        <p>Average Monthly Expense:  Rs.{averageMonthlyExpense}</p>
        <p>Acceptance Percentage of Claims: {acceptancePercentage}%</p>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Expense Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          {showPiechart && <PieChart>
            <Pie data={categoryExpense} cx="50%" cy="50%" labelLine={false} label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="amt">
              {categoryExpense.map((entry, index) => (
                <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsPage;
