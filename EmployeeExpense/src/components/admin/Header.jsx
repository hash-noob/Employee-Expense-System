import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";
import './admin.css';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} className="header">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" className="header-title">
          Good afternoon, Acme Inc.
        </Typography>
        <div className="header-icons">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
          <Avatar alt="Acme Inc." src="/static/images/avatar/1.jpg" />
        </div>
      </Toolbar>
    </AppBar>
  ); 
};

export default Header;
