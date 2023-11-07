import BarCharts from './BarChart';
import LineCharts from './LineChart';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';


export const OverallInfo=()=>{
    const [selectedIndex, setSelectedIndex] = useState(0);
    const  auth=true;

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <List sx={{marginLeft: '5%', marginRight: '10%'}} component="nav" aria-label="mailbox folders">
                        <ListItem button sx={{padding: '20px'}}
                                  onClick={(event) => handleListItemClick(event, 0)}>
                            <ListItemText primary="Number of clicks in the past week" />
                        </ListItem>
                        <Divider />
                        {/* <ListItem button sx={{padding: '20px'}}>
                            <ListItemText primary="Distribution of chicks" />
                        </ListItem>
                        <Divider /> */}
                        <ListItem button sx={{padding: '20px'}}
                                  onClick={(event) => handleListItemClick(event, 1)}>
                            <ListItemText primary="Click trending" />
                        </ListItem>
                        <Divider />
                        <ListItem button sx={{padding: '20px'}}
                                  onClick={(event) => handleListItemClick(event, 2)}>
                            <ListItemText primary="More features" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    {selectedIndex === 0 && <BarCharts/>}
                    {selectedIndex === 1 && <LineCharts/>}
                </Grid>
            </Grid>
        </div>
    );
}
