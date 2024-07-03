import React from "react";
import axios from "axios";
import WithdrawButton from "./WithDrawBtn";

const  RequestCard = ({ request,claims,setClaims }) =>{
  
  const withdrawClaim = async ()=>{
      try{
           const res = await axios.put("http://localhost:3001/api/user/claims/withdraw",{cId : request.title})
            if(res){
              setClaims(claims.filter((ele)=>ele.title!=res.data.cId))
            }
      }catch(err){
        console.log(err)
      }
  }
  
  return (
          <div className="p-4 bg-white rounded-lg shadow-md mb-4 ">
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <p className="text-gray-600">Rs.{request.description}</p>
            {/* <p className="text-gray-600">{request.status}</p> */}
            <WithdrawButton claim = {request.title} withdrawClaim = {withdrawClaim}/>
          </div>
        )
}


  export default RequestCard