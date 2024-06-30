import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import { useNavigate } from 'react-router-dom';


const SettingsPage = () => {

  const navigate = useNavigate()
  
  const handleChangePassword = () => {
    navigate('/dashboard/settings/ChangePassword')
  };

  const handleChangeMobileNumber = () => {
    navigate('/dashboard/settings/ChangeNumber')
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
      <ProfilePhoto src='' />
      <div className='text-xl text-center my-5 '>
        Welcome {localStorage.getItem('eId')}!!
      </div>
      <div className="space-y-4">
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
        <button
          onClick={handleChangeMobileNumber}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Mobile Number
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
