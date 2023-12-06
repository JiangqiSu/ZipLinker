import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DefaultHeader() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleManageClick = () => {
    navigate('/management/:userId');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleManageClick}>Manage</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ZipLinker
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}