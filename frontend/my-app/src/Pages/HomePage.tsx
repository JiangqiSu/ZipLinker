import React from 'react';
import DefaultHeader from '../Components/DefaultHeader';
import ShortenerInput from '../Components/shortenerInput';
import { Navigate } from 'react-router-dom';
import { Footer } from '../Components/Footer';

declare global {
    var url: string;
    var urlList: any;
}
globalThis.url='https://f23-team1-test-dot-rice-comp-539-spring-2022.uk.r.appspot.com'
globalThis.urlList=[]

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
