import { Navigate } from 'react-router-dom';
import DefaultHeader from '../Components/DefaultHeader';
import BarCharts from '../Components/BarChart';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import History from '../Components/History';

export const DashboardPage = () => {
    const auth = true;

        //TODO: wait for the backend
        const dummy = [
            {
                url: 'https://short.ly/abc123',
                date: '2023-10-15',
                originalURL: 'https://www.example.com/original-url1',
            },
            {
                url: 'https://short.ly/def456',
                date: '2023-10-16',
                originalURL: 'https://www.example.com/original-url2',
            },
            {
                url: 'https://short.ly/ghi789',
                date: '2023-10-17',
                originalURL: 'https://www.example.com/original-url3',
            },
            {
                url: 'https://short.ly/jkl012',
                date: '2023-10-18',
                originalURL: 'https://www.example.com/original-url4',
            },
        ];

    return auth ? (
        <div>
            <DefaultHeader></DefaultHeader>
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <History shortenedURLs={dummy} />
                </Grid>
                <Grid item xs={2}>
                    
                    <List sx={{marginLeft: '10%', marginRight: '10%'}} component="nav" aria-label="mailbox folders">
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Number of clicks in the past week" />
                        </ListItem>
                        <Divider />
                        {/* <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Distribution of chicks" />
                        </ListItem>
                        <Divider /> */}
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Click trending" />
                        </ListItem>
                        <Divider />
                        <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="More features" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={7}>
                    <BarCharts></BarCharts>
                </Grid>
            </Grid>
        </div>
    ) : <Navigate to="/login" />
}
