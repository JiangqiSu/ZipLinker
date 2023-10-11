import React, { useState } from 'react';
import './ShortenerInput.css';
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
    <div>
      <h1>URL Shortener</h1>
      <div>
        <input
          type="text"
          placeholder="Enter the URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
        />
        <button onClick={handleShortenURL}>Shorten</button>
      </div>
      {shortenedURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedURL} target="_blank" rel="noreferrer">
            {shortenedURL}
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortenerInput;