import './App.css'
import BillContainer from './BillContainer';
import RequestList from './RequestList';
import Sidebar from './SideBar';
import React from 'react';


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



const Dashboard = () => {


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

export default Dashboard;
