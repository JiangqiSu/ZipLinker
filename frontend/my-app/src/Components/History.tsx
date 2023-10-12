import React from 'react';
import { Card, CardContent, Typography, Link, List, ListItemText, ListItemIcon, Paper } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History'; // Import an icon for the history

interface HistoryCard {
    url: string;
    date: string;
    originalURL: string;
}

interface HistoryProps {
    shortenedURLs: HistoryCard[];
}

const History: React.FC<HistoryProps> = ({ shortenedURLs }) => {
    return (
        <Card elevation={3} style={{ marginTop: '16px', maxWidth: '400px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <ListItemIcon>
                        <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <span style={{ color: '#333', fontWeight: 'bold' }}>Shortened URL History</span>
                </Typography>
                <List>
                    {shortenedURLs.map((entry, index) => (
                        <Paper
                            elevation={1}
                            key={index}
                            style={{
                                marginBottom: '8px',
                                padding: '12px',
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <ListItemIcon>
                                <Link href={entry.url} target="_blank" rel="noreferrer">
                                    {index + 1}
                                </Link>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Date Created:</Typography>
                                <Typography variant="body2">{entry.date}</Typography>
                                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Original URL:</Typography>
                                <Typography variant="body2">{entry.originalURL}</Typography>
                                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Shortened URL:</Typography>
                                <Typography variant="body2">
                                    <Link href={entry.url} target="_blank" rel="noreferrer">{entry.url}</Link>
                                </Typography>
                            </ListItemText>
                        </Paper>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default History;
