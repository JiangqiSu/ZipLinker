import { Navigate } from 'react-router-dom';
import DefaultHeader from '../Components/DefaultHeader';
import BarCharts from '../Components/charts/BarChart';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
export const DashboardPage = () => {
    const auth = true;
    return auth ? (
        <div>
            <DefaultHeader></DefaultHeader>
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <List sx={{marginLeft: '10%', marginRight: '10%'}} component="nav" aria-label="mailbox folders">
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Number of clicks in the past week" />
                        </ListItem>
                        <Divider />
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Distribution of chicks" />
                        </ListItem>
                        <Divider />
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Click trending" />
                        </ListItem>
                        <Divider />
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Placeholder" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <BarCharts></BarCharts>
                </Grid>
            </Grid>
        </div>
    ) : <Navigate to="/login" />
}
