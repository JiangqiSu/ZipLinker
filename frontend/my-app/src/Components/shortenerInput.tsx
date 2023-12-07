import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShortenerInput = () => {
    const [originalURL, setOriginalURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState<{ id: string; url: string; }[]>([]);
    const [advanced, setAdvanced] = useState(false);
    const [advancedOrBasic, setAOB] = useState('Advanced');
    const [customizedPrefix, setCustomizedPrefix] = useState('');
    // const [bulkDataInput, setBulkDataInput] = useState(false);
    const [bulkURL, setBulkURL] = useState('');

    useEffect(() => {
        setAOB(advanced ? 'Basic' : 'Advanced');
    }, [advanced]);

    const handleShortenURL = async () => {
        let shortenedURLs: { id: string; url: string; }[] = [];
        let domain;
        try {
            const url = globalThis.url + '/gen-short-url';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: globalThis.userEmail,
                    long_url: originalURL
                }).toString(),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('url', data);
                const shortURL = "http://f23-team1-test-dot-rice-comp-539-spring-2022.uk.r.appspot.com/" + data.short_url;
                shortenedURLs.push({ id: data.short_url, url: shortURL });
                globalThis.urlList.push({
                    id: data.short_url, name: '', shortURL: shortURL, oriURL: originalURL, clicks: data.clicks,
                    created: data.create_time, expired: data.expire_time, status: 'Active'
                })
                setShortenedURL(shortenedURLs);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCopyURL = () => {
        const urls = shortenedURL.map((item) => item.url).join(' ');
        const input = document.createElement('input');
        input.value = urls;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };

    return (
        <div style={{ textAlign: 'center', backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" gutterBottom>
                URL Shortener
            </Typography>

            {!advanced && (
                <TextField
                    variant="outlined"
                    label="Enter the URL you want to shorten"
                    value={originalURL}
                    onChange={(e) => setOriginalURL(e.target.value)}
                    style={{ width: '50%', marginBottom: '20px', marginRight: '20px' }}
                />)}

            {advanced && (
                <TextField
                    variant="outlined"
                    label="Enter the URLs you want to shorten"
                    multiline
                    rows={5}
                    value={bulkURL}
                    onChange={(e) => setBulkURL(e.target.value)}
                    style={{ width: '50%', marginBottom: '20px', marginRight: '20px' }}
                />)}

            {advanced && (
                <TextField
                    variant="outlined"
                    label="Enter customized prefix"
                    value={customizedPrefix}
                    onChange={(e) => setCustomizedPrefix(e.target.value)}
                    style={{ width: '50%', marginBottom: '20px', marginRight: '20px' }}
                />
            )}


            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '10vh' }}
            >
                <Grid item xs={3}>
                    <Stack spacing={2} direction="row">
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={handleShortenURL}
                            endIcon={<SendIcon />}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            onClick={() => setAdvanced(!advanced)}
                        >
                            {advancedOrBasic}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            {shortenedURL.length !== 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Shortened URL:
                    </Typography>
                    {shortenedURL.map((link) => (
                        <Grid item xs="auto">
                            <Link
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary"
                                style={{ fontSize: '16px', textDecoration: 'none' }}
                            >
                                {link.url}
                            </Link>
                        </Grid>
                    ))}
                    <div style={{ paddingTop: '15px' }}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            endIcon={<ContentCopyIcon />}
                            onClick={handleCopyURL}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ShortenerInput;

