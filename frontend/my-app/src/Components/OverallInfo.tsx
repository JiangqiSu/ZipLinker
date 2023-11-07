import BarCharts from './BarChart';
import LineCharts from './LineChart';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import {Typography} from "@mui/material";
import RadioGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


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
                    <Typography variant="h6" gutterBottom align={"left"}>
                        Filter
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align={"left"}>
                        Time Span
                    </Typography>
                    <RadioGroup sx={{position: 'flex', flexDirection: 'row'}}>
                        <FormControlLabel control={<Radio size="small"/>} label={<Typography variant="body2">Last week</Typography>} />
                        <FormControlLabel control={<Radio size="small"/>} label={<Typography variant="body2">Last month</Typography>} />
                        <FormControlLabel control={<Radio size="small"/>} label={<Typography variant="body2">Last year</Typography>} />
                    </RadioGroup>
                    <Typography variant="subtitle1" gutterBottom align={"left"}>
                        URL Status
                    </Typography>
                    <RadioGroup sx={{position: 'flex', flexDirection: 'row'}}>
                        <FormControlLabel control={<Radio size="small"/>} label={<Typography variant="body2">Active</Typography>} />
                        <FormControlLabel control={<Radio size="small"/>} label={<Typography variant="body2">Expired</Typography>} />
                    </RadioGroup>
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
