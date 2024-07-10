import React from 'react';
import Profile from '../../assets/profile.png'

const ProfilePhoto = ({ src }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <img 
        src={Profile} 
        alt="Profile" 
        className="w-34 h-32 rounded-full"
      />
    </div>
  );
};

export default ProfilePhoto;
