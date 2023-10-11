import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function DashboardSideMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemText>Link for Grubhub</ListItemText>
          <Typography variant="body2" color="text.secondary">
            10 clicks
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Link for UberEats</ListItemText>
          <Typography variant="body2" color="text.secondary">
            7 clicks
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemText>Link for Doordash</ListItemText>
          <Typography variant="body2" color="text.secondary">
            21 clicks
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Something Else</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}