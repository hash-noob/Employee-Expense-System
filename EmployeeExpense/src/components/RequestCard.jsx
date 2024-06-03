import React from "react";
import WithdrawButton from "./WithDrawBtn";

const  RequestCard = ({ request }) => (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 ">
      <h3 className="text-lg font-semibold">{request.title}</h3>
      <p className="text-gray-600">{request.description}</p>
      <WithdrawButton/>
    </div>
  )

  export default RequestCard