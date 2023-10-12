import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const ShortenerInput = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  //TODO: wait for backend
  const handleShortenURL = () => {
    const domain = 'https://abc.com/';
    const shortURL = domain + Math.random().toString(36).substring(2, 8);
    setShortenedURL(shortURL);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <TextField
        variant="outlined"
        label="Enter the URL you want to shorten"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
        style={{ width: '50%', marginBottom: '20px', marginRight: '20px' }}
      />


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
              onClick={handleShortenURL}
            >
              Advanced
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {shortenedURL && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Shortened URL:
          </Typography>
          <Link
            href={shortenedURL}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            style={{ fontSize: '16px', textDecoration: 'none' }}
          >
            {shortenedURL}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShortenerInput;
