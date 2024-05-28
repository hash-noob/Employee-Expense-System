import React, { useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import FloatingButton from "./FloatingButton";
import axios from "axios";


const RequestList = () => {

    const [claims,setclaims] = useState([])
    const getclaims= async ()=>{
      const res = await axios.get("http://localhost:3001/api/user/claims",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }
      })
      console.log(res.data)

      let temp=[]
      for(let ele of res.data){
        temp.push({
          title : ele.claimId,
          description : ele.billdescription,
        })
      }
      console.log(temp)
      setclaims(temp)
    }

    useEffect(()=>{getclaims()},[])

    return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hg flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Pending Claims</h2>
      <div className="flex-1 overflow-y-auto">
        {claims.map((request, index) => (
          <RequestCard key={index} request={request} />
        ))}
      </div>
      <FloatingButton/>
    </div>
    );
}

  export default RequestList ;