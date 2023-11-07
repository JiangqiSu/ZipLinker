import USAMap from './USAMap';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
import {Paper} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Divider from '@mui/material/Divider';

const allURLs=[{
    id: 1,
    url: "https://abc.com/3j4m49",
    date: "10/12/2023",
    status: "Expired",
    bulk: false,
}, {
    id: 2,
    url: "https://abc.com/wb620s",
    date: "10/15/2023",
    status: "Expired",
    bulk: false,
},{
    id: 3,
    url: "https://abc.com/c8wasv",
    date: "10/21/2023",
    status: "Active",
    bulk: false,
},{
    id: 4,
    url: "https://abc.com/c3urgu",
    date: "11/03/2023",
    status: "Active",
    bulk: false,
},{
    id: 5,
    url: "https://abc.com/n37zqv",
    date: "11/05/2023",
    status: "Active",
    bulk: false,
},{
    id: 6,
    url: "https://abc.com/n37zqv",
    date: "11/05/2023",
    status: "Active",
    bulk: false,
},{
    id: 7,
    url: "https://abc.com/n37zqv",
    date: "11/05/2023",
    status: "Active",
    bulk: false,
},{
    id: 8,
    url: ["https://abc.com/086nwr", "https://abc.com/9dr38l", "https://abc.com/j7mpx9",
        "https://abc.com/ybn7ra", "https://abc.com/neysf1", "https://abc.com/t3sbtj",
        "https://abc.com/9ua6fk"],
    date: "11/05/2023",
    status: "Active",
    bulk: true,
},{
    id: 9,
    url: "https://abc.com/n37zqv",
    date: "11/05/2023",
    status: "Active",
    bulk: false,
},{
    id: 10,
    url: "https://abc.com/n37zqv",
    date: "11/05/2023",
    status: "Active",
    bulk: false,
}];

export const SingleLinkInfo=()=>{
    const auth=true;

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper style={{ maxHeight: 500, overflow: 'auto' }}>
                        <List sx={{marginLeft: '5%', marginRight: '10%'}}>
                            {allURLs.map((item)=>(
                                item.bulk? (
                                    <div>
                                        <ListItem button onClick={handleClick} sx={{paddingLeft: '20px'}}>
                                            <ListItemText primary="Bulk Data"
                                                          secondary={`Status: ${item.status}\nCreate Date: ${item.date}`}
                                                          secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }}/>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {Array.isArray(item.url)? (
                                                    item.url.map((u: string)=>(
                                                        <ListItem button sx={{ pl: 4 }}>
                                                            <ListItemText primary={`${u}`}/>
                                                        </ListItem>
                                                    ))):(
                                                    <ListItem button sx={{ pl: 4 }}>
                                                        <ListItemText primary={`${item.url}`}/>
                                                    </ListItem>)}
                                            </List>
                                        </Collapse>
                                    </div>
                                ):(
                                    <ListItem button sx={{paddingLeft: '20px'}}>
                                        <ListItemText primary={`${item.url}`}
                                                      secondary={`Status: ${item.status}\nCreate Date: ${item.date}`}
                                                      secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }}/>
                                    </ListItem>)
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <USAMap/>
                </Grid>
            </Grid>
        </div>
    );
}
