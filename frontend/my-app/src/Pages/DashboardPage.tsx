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
        </div>
    ) : <Navigate to="/login" />
}
