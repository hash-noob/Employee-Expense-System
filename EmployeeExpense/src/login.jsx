import './App.css'
import BillContainer from './BillContainer';
import React from 'react';


const Sidebar = () => (
  <div className="bg-gray-900 text-white w-64 h-screen flex flex-col">
    <div className="flex items-center justify-center h-16">
      <div className="text-lg font-bold">Logo</div>
    </div>
    <nav className="flex-1 px-2 space-y-1">
      <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">
        <span className="mr-3"></span>
        Dashboard
      </a>
    </nav>
    <div className="px-2 py-2 mt-auto">
      <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
        <span className="mr-3">⚙️</span>
        Settings
      </a>
    </div>
  </div>
);



const RequestCard = ({ request }) => (
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
);

const RequestList = ({ requests }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md hg flex flex-col">
    <h2 className="text-xl font-semibold mb-4">Pending Claims</h2>
    <div className="flex-1 overflow-y-auto">
      {requests.map((request, index) => (
        <RequestCard key={index} request={request} />
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const requests = [
    {
      title: 'Request 1',
      description: 'Description of request 1',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    },
    {
      title: 'Request 2',
      description: 'Description of request 2',
      links: [
        { text: 'Link 1', url: '#' },
        { text: 'Link 2', url: '#' },
      ],
    }
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="flex">
              <BillContainer/>
            <div className="w-1/3 ml-6">
              <RequestList requests={requests} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return <Dashboard />;
}

export default App;
