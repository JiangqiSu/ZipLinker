import React from 'react';
import DefaultHeader from './Components/DefaultHeader';
import ShortenerInput from './Components/shortenerInput';
import './App.css';
import { PageRoutes } from './Routes';

function App() {
  return (
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;
