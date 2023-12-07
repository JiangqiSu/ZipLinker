import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';

export default function DefaultHeader() {

  const [manageOrHome, setManageOrHome] = useState(useLocation().pathname == '/management/:userId' ? 'Home' : 'Manage');
  const [loginOrSignOut, setLoginOrSignOut] = useState(globalThis.userEmail ? 'Sign Out' : 'Log In');

  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (loginOrSignOut==='Log In'){
      navigate('/login');
    }else{
      globalThis.userEmail=''
    }
  };

  const goHome = () => {
    navigate('/');
  }

  const handleManageClick = () => {
    navigate(manageOrHome == 'Manage' ? '/management/:userId' : '/home');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleManageClick}>{manageOrHome}</Button>
          <Typography onClick={goHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ZipLinker
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>{loginOrSignOut}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
