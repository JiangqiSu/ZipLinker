import USAMap from './USAMap';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import RadioGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useEffect, useState } from 'react';
import { Paper, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

/*const allURLs=[{
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
*/
interface URLItem {
    id: number;
    short_url: string;
    long_url: string;
    create_date: string;
    expire_date: string;
    status: string;
    bulk: boolean;
}
export const SingleLinkInfo = () => {
    const auth = true;

    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [allURLs, setAllURLs] = useState<URLItem[]>([]);

    const determineStatus = (item: { short_url?: any; create_time?: any; expire_time: any; }) => {
        const currentDate = new Date();
        const expireDate = new Date(item.expire_time);
        return expireDate > currentDate ? "Active" : "Expired";
    };
    useEffect(() => {
        const fetchURLs = async () => {
            try {
                const getActivityUrl = `${globalThis.url}/get-activity`;
                const response = await fetch(`${getActivityUrl}?email=${encodeURIComponent(globalThis.userEmail)}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const formattedData = data.map((item: {
                    long_url: any; short_url?: any; create_time?: any; expire_time?: any;
                }, index: number) => ({
                    id: index + 1,
                    short_url: item.short_url,
                    long_url: item.long_url,
                    create_date: item.create_time,
                    expire_date: item.expire_time,
                    status: determineStatus({
                        short_url: item.short_url,
                        create_time: item.create_time,
                        expire_time: item.expire_time || 'Default Expire Time'
                    }),
                    bulk: false
                }));
                setAllURLs(formattedData);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchURLs();
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickFilter = () => {
        setOpenFilter(!openFilter);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(1)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch'
            },
        },
    }));

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <List>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search" value={searchContent} inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <ListItemButton onClick={handleClickFilter}>
                            <ListItemText primary="Filter" />
                            {openFilter ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openFilter} timeout="auto" unmountOnExit sx={{ pl: 4 }}>
                            <Typography variant="subtitle1" gutterBottom align={"left"}>
                                Time Span
                            </Typography>
                            <RadioGroup sx={{ position: 'flex', flexDirection: 'row' }}>
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Last week</Typography>} />
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Last month</Typography>} />
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Last year</Typography>} />
                            </RadioGroup>
                            <Typography variant="subtitle1" gutterBottom align={"left"}>
                                URL Status
                            </Typography>
                            <RadioGroup sx={{ position: 'flex', flexDirection: 'row' }}>
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Active</Typography>} />
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Expired</Typography>} />
                            </RadioGroup>
                            <Typography variant="subtitle1" gutterBottom align={"left"}>
                                Data Type
                            </Typography>
                            <RadioGroup row>
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Single Data</Typography>} />
                                <FormControlLabel control={<Radio size="small" />} label={<Typography variant="body2">Bulk Data</Typography>} />
                            </RadioGroup>
                        </Collapse>
                    </List>
                    <Paper style={{ maxHeight: 500, overflow: 'auto', width: '100%' }}>
                        <List sx={{ margin: '0', padding: '0' }}>
                            {allURLs.map((item) => (
                                <ListItem button sx={{ paddingLeft: '20px' }}>
                                    <ListItemText primary={`${item.short_url}`}
                                        secondary={`Long URL:${item.long_url}\nStatus: ${item.status}\nCreate Date: ${item.create_date}\nExpire Date: ${item.expire_date}`}
                                        secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }} />
                                </ListItem>)
                            )}
                        </List>
                    </Paper>

                </Grid>
                <Grid item xs={6}>
                    <USAMap />
                </Grid>
            </Grid>
        </div>
    );
}
