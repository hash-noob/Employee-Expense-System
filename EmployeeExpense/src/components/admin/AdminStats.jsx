// StatisticsPage.jsx
import React, { useEffect, useState } from 'react';
import { Legend,Bar,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell ,BarChart} from 'recharts';
import axios from 'axios'

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


const monthify = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Oct','Nov','Dec'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#red'];

const AdminStats = () => {
  
  const [monthly_exps,setMonthlyExps] = useState()
  const [categorical_exps,setCategoricalExps] = useState()
  const [settled_claims,setSettledClaims] = useState()

  const [bar,setBar] = useState(false)
  const [pie,setPie] = useState(false)
  const [area,setArea] = useState(false)

  useEffect(()=>{
    if(monthly_exps)
      setBar(true)
  },[monthly_exps])

  useEffect(()=>{
    if(categorical_exps)
      setPie(true)
  },[categorical_exps])

  useEffect(()=>{
    if(settled_claims)
      setArea(true)
  },[settled_claims])

  useEffect(()=>{
    const fetchStats = async () => {
      console.log("called")
      try {
        const response = await axios.get('http://localhost:3001/api/admin/stats');
        const {monthly_exps,category_exps,settled_claims} = response.data
        console.log(category_exps)
        setMonthlyExps(monthly_exps.map((ele)=>({_id : monthify[ele._id-1], bills : ele.bills, claims:ele.claims})))
        setCategoricalExps(category_exps)
        setSettledClaims(settled_claims.map((ele)=>({_id : monthify[ele._id-1], count : ele.count})))
      } catch (error) {
       console.log(error) 
      }
    }
    fetchStats()
  },[])

  return (
    <div style={{marginTop:"40px"}}>
      <div className='mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl'> 
      <h3 className="text-xl font-semibold mb-4">Bills vs Claims</h3>
        <ResponsiveContainer width="100%" height={300}>
        {bar && <BarChart width={730} height={250} data={monthly_exps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="claims" fill="#8884d8" />
          <Bar dataKey="bills" fill="#82ca9d" />
        </BarChart>}
        </ResponsiveContainer>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Expense Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          {pie && <PieChart>
            <Pie data={categorical_exps} cx="50%" cy="50%" labelLine={false} label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(1)}%`} outerRadius={100} fill="#8884d8" dataKey="amt">
              {categorical_exps.map((entry, index) => (
                <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>}
        </ResponsiveContainer>
      </div>
      <div className="mb-8 p-4  bg-white rounded-lg shadow-md hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Claims Reimbersed by company</h3>
        <ResponsiveContainer width="100%" height={300}>
          {area && <AreaChart data={settled_claims} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="url(#colorExpense)" />
          </AreaChart>}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStats;
