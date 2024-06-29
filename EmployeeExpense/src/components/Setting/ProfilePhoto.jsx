import React from 'react';

const ProfilePhoto = ({ src }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <img 
        src={src} 
        alt="Profile" 
        className="w-32 h-32 rounded-full border-2 border-gray-300"
      />
    </div>
  );
};

export default ProfilePhoto;
