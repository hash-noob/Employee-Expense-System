import React from "react";
import RequestCard from "./RequestCard";
import FloatingButton from "./FloatingButton";


const RequestList = ({ requests }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hg flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Pending Claims</h2>
      <div className="flex-1 overflow-y-auto">
        {requests.map((request, index) => (
          <RequestCard key={index} request={request} />
        ))}
      </div>
      <FloatingButton/>
    </div>
  );

  export default RequestList ;