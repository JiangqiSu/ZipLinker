import React from 'react';
import DefaultHeader from '../Components/DefaultHeader';
import ShortenerInput from '../Components/shortenerInput';
import { Navigate } from 'react-router-dom';

function HomePage() {
    const auth = true;
    return auth ? (
        <div className="App">
        <DefaultHeader></DefaultHeader>
        <ShortenerInput></ShortenerInput>
        </div>
    ) : <Navigate to="/login" />;
}

export default HomePage;