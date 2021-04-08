// outer
import React from 'react';

// local
import './App.css';
// import Body from './components/body/Body';
// import Header from "./components/header/Header";
import BackCanvas from "./components/backCanvas/BackCanvas";


function App() {
    return (
        <div className="App_container">
            <BackCanvas/>
            {/*<Header/>*/}
            {/*<Body/>*/}
        </div>
    );
}

export default App;
