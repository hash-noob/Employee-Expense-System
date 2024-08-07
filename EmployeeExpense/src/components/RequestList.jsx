import React, { useContext, useEffect, useState } from "react";
import RequestCard from "./RequestCard";
import axios from "axios";
import Claimpopup from "./Claimpopup";
import billsContext from "./BillsContext";


const RequestList = () => {
    const [claims,setclaims] = useState([])
    const [claimPopup,setClaimPopup] = useState(false)
    const {bills,setBills} = useContext(billsContext)

  function showClaimPop(){
    setClaimPopup(true)
  }

  function closeClaimPop(){
    setClaimPopup(false)
  }

    const getclaims = async ()=>{
      const res = await axios.get("http://localhost:3001/api/user/claims",{
        headers:{
          Authorization:"Bearer "+localStorage.getItem('token')
        }
      })
      setclaims(res.data)
    }

    useEffect(()=>{getclaims()},[])



    const onSubmit = async (formData)=>{
      const res = await axios.post('http://localhost:3001/api/user/fileClaim',formData)
      if(res.status===200){
        setclaims((prev)=> [...prev,res.data])
        setBills(bills.filter((ele)=>(!formData.billsArray.includes(ele.billId))))
      }
    }

    return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md  hg flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Pending Claims</h2>
      <div className="flex-1 overflow-y-auto">
        {claims.map((request,index) => (
          <RequestCard key={index} request={request} setClaims = {setclaims} claims={claims}/>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={showClaimPop}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          File New Claim
        </button>
      </div>
      {claimPopup && <Claimpopup  onClose={closeClaimPop} onSubmit={onSubmit}/>}
    </div>
    );
}

  export default RequestList ;