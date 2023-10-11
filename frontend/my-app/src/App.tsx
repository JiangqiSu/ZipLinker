import React from 'react';
import DefaultHeader from './Components/DefaultHeader';
import ShortenerInput from './Components/shortenerInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <DefaultHeader></DefaultHeader>
      <ShortenerInput></ShortenerInput>
    </div>
  );
}

export default App;
