import Sidebar from "../SideBar";
import BudgetCard from "./BudgetCards";
import './admin.css'
import { useState,useEffect } from "react";
import axios from 'axios'
const Dashboard=()=>{
    const [stats, setStats] = useState({ userCount: 0, managerCount: 0});

    useEffect(async() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/admin/stats');
              setStats(response.data);
            } catch (error) {
              console.error("There was an error fetching the stats!", error);
            }
          };
      
          fetchData();
      }, []);

      const cardContents = [
        { title: "No of Users", count: stats.userCount },
        { title: "No of Managers", count: stats.managerCount },
        //{ title: "Total No. of Claims This Week", count: stats.claimCount },
      ];

    return (
        <div className="container">
            <Sidebar/>
            {cardContents.map((content, index) => (
          <BudgetCard key={index} cardContent={content} />
        ))}
        </div>
        
    )
}

export default Dashboard