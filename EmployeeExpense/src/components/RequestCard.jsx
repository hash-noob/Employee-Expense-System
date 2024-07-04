import React, { useContext } from "react";
import axios from "axios";
import WithdrawButton from "./WithDrawBtn";
import billsContext from "./BillsContext";

const  RequestCard = ({ request,claims,setClaims }) =>{

  const {bills,setBills} = useContext(billsContext)

  const withdrawClaim = async ()=>{

      try{
           const billsArray = claims.find((ele)=>(ele.cId === request.cId)).billsArray

           const res = await axios.put("http://localhost:3001/api/user/claims/withdraw",{cId : request.cId,billsArray})
           const {updatedClaim,updatedBills} = res.data;
           
            if(updatedClaim){
              setClaims(claims.filter((ele)=>ele.cId!=updatedClaim.data.cId))
            }
            if(updatedBills){
              setBills(bills.concat(updatedBills))
            }
      }catch(err){
        console.log(err)
      }
  }
  
  return (
          <div className="p-4 bg-white rounded-lg shadow-md mb-4 ">
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <p className="text-gray-600">Rs.{request.totalAmount}</p>
            {/* <p className="text-gray-600">{request.status}</p> */}
            <WithdrawButton claim = {request.title} withdrawClaim = {withdrawClaim}/>
          </div>
        )
}


  export default RequestCard