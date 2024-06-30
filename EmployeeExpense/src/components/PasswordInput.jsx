import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PasswordInput = ({placeholder,onchange,id}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className = "flex border border-gray-300 rounded my-4">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder= {placeholder}
        onChange = {onchange}
        id = {id}
        className="border-hidden rounded px-4 py-2 flex-grow"
      />
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 rounded-full"
        onClick={handleTogglePasswordVisibility}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>

    </div>
  );
};

export default PasswordInput;
