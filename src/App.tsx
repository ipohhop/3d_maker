// outer
import React from 'react';

// local
import './App.css';
import Body from './components/body/Body';
import Header from "./components/header/Header";


function App() {
  return (
    <div className="App_container">
      <Header/>
      <Body/>
    </div>
  );
}

export default App;
