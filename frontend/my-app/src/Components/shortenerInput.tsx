import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { ContentCopy } from '@mui/icons-material';

const ShortenerInput = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortenedURL, setShortenedURL] = useState<{ id: number; url: string; }[]>([]);
  const [advanced, setAdvanced] = useState(false);
  const [customizedPrefix, setCustomizedPrefix] = useState('');
  const [bulkDataInput, setBulkDataInput] = useState(false);
  const [bulkURL, setBulkURL] = useState('');


  //TODO: wait for backend
  const handleShortenURL = () => {
      let shortenedURLs: { id: number; url: string; }[]=[];
      let domain;
      if (customizedPrefix) {
          domain = 'https://' + customizedPrefix + '.com/';
      }
      else{
          domain = 'https://abc.com/';
      }
      if (bulkDataInput){
          const URLs = bulkURL.split('\n');
          for (let i=0;i<URLs.length;i++){
              const tmpURL = domain + Math.random().toString(36).substring(2, 8);
              shortenedURLs.push({id: i,url: tmpURL});
          }
          setShortenedURL(shortenedURLs);
      }else{
          const shortURL = domain + Math.random().toString(36).substring(2, 8);
          shortenedURLs.push({id: 1,url: shortURL});
          setShortenedURL(shortenedURLs);
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

        {!bulkDataInput && (
            <TextField
            variant="outlined"
            label="Enter the URL you want to shorten"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            style={{ width: '50%', marginBottom: '20px', marginRight: '20px' }}
        />)}

        {bulkDataInput && (
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
              onClick={() => setAdvanced(true)}
            >
              Advanced
            </Button>
              {advanced && (
                  <Button
                      variant="outlined"
                      size="large"
                      color="primary"
                      onClick={() => setBulkDataInput(true)}
                  >
                      Bulk Data
                  </Button>
              )}
          </Stack>
        </Grid>
      </Grid>

      {shortenedURL.length !== 0  && (
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
            endIcon={<ContentCopy />}
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
