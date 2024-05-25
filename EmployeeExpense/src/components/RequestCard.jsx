import React from "react";
 
const  RequestCard = ({ request }) => (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">{request.title}</h3>
      <p className="text-gray-600">{request.description}</p>
      <div className="mt-2 space-x-2">
        {request.links.map((link, index) => (
          <a key={index} href={link.url} className="text-blue-500 hover:underline">
            {link.text}
          </a>
        ))}
      </div>
    </div>
  )

  export default RequestCard