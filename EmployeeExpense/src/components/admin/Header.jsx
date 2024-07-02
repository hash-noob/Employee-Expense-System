import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";
import './admin.css';

const Header = () => {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning, Admin!";
    } else if (hour < 18) {
      return "Good afternoon, Admin!";
    } else {
      return "Good evening, Admin!";
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} className="header">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1  className="header-title">
          {getCurrentGreeting()}
        </h1>
        
      </Toolbar>
    </AppBar>
  ); 
};

export default Header;
