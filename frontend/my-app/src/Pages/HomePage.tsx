import React from 'react';
import DefaultHeader from '../Components/DefaultHeader';
import ShortenerInput from '../Components/shortenerInput';
import History from '../Components/History';
import { Navigate } from 'react-router-dom';

function HomePage() {
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
        {
            url: 'https://short.ly/mno345',
            date: '2023-10-19',
            originalURL: 'https://www.example.com/original-url5',
        },
        {
            url: 'https://short.ly/pqr678',
            date: '2023-10-20',
            originalURL: 'https://www.example.com/original-url6',
        },
        {
            url: 'https://short.ly/stu901',
            date: '2023-10-21',
            originalURL: 'https://www.example.com/original-url7',
        },
    ];

    return auth ? (
        <div className="App">
            <DefaultHeader></DefaultHeader>
            <ShortenerInput></ShortenerInput>
            <History shortenedURLs={dummy} />
        </div>
    ) : <Navigate to="/login" />;
}

export default HomePage;