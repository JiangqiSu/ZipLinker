import { Navigate } from 'react-router-dom';
import DefaultHeader from '../Components/DefaultHeader';
import Grid from '@mui/material/Grid';
import History from '../Components/History';

export const HistoryPage = () => {
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
            <DefaultHeader/>
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <History shortenedURLs={dummy} />
                </Grid>
            </Grid>
        </div>
    ) : <Navigate to="/login" />
}
