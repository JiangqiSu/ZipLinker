import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DefaultHeader from '../Components/DefaultHeader';
import { OverallInfo } from "../Components/OverallInfo";
import { SingleLinkInfo } from "../Components/SingleLinkInfo";
import { Tab } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext } from "@mui/lab";
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const DashboardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const userEmail = currentPath.split('/')[2];
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const auth = true;

    function handleManageClick(): void {
        const newPath = `/management/${userEmail}`;
        navigate(newPath);
    }

    //TODO: wait for the backend
    return auth ? (
        <div>
            <DefaultHeader />
            <h1>Dashboard</h1>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Overall Statistics" value="1" />
                        <Tab label="URL Specific Statistics" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <OverallInfo />
                </TabPanel>
                <TabPanel value="2">
                    <SingleLinkInfo />
                </TabPanel>
            </TabContext>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleManageClick}
                    sx={{
                        backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                        },
                        padding: '10px 30px',
                    }}
                    endIcon={<ArrowForwardIosIcon />}
                >
                    <Typography variant="button" component="span">
                        Manage your URLs
                    </Typography>
                </Button>
            </Box>

        </div>
    ) : <Navigate to="/login" />
}
