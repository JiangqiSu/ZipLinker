import React from 'react';
import DefaultHeader from '../Components/DefaultHeader';
import ShortenerInput from '../Components/shortenerInput';
import { Navigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';

function HomePage() {
    const auth = true;

    return auth ? (
        <div className="App">
            <DefaultHeader/>
            <ShortenerInput/>
            <Footer />
        </div>
    ) : <Navigate to="/login" />;
}

export default HomePage;
