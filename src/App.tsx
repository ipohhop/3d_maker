// outer
import React, {createContext, useContext, useMemo, useRef, useState} from 'react';

// local
import './App.css';
import Body from './components/body/Body';
import Header from "./components/header/Header";
import BackCanvas from "./components/backCanvas/BackCanvas";
import {creatPerspectiveCamera} from "./threejs/scene&camera";
import {ConstructorCanvas} from "./threejs/constructorCanvas";
import {InsertState} from "./classConstructors";





type GlobalContent = {
    canvas: InsertState,
    setWidth: React.Dispatch<React.SetStateAction<number>> | number,
    setHeight: React.Dispatch<React.SetStateAction<number>> | number,
}


const MyGlobalContext = createContext<GlobalContent>({
    canvas: new InsertState(new ConstructorCanvas(creatPerspectiveCamera(500, 500, 0, 0, 26.5), 500, 500)),
    setWidth: 500,
    setHeight: 500,
})

export const useGlobalContext = () => useContext(MyGlobalContext)


function App() {

    const [focusMonitor, setFocusMonitor] = React.useState(false)

// creat canvas-constructor

    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    const camera = useMemo(() => creatPerspectiveCamera(width, height, 0, 0, 26.5), [width, height])
    const canvas = useRef(new ConstructorCanvas(camera, width, height))



    if (!focusMonitor) {
        return <div className="App_container">
            <BackCanvas onMonitorFocus={setFocusMonitor}/>
        </div>
    }

    return (
        <div className="App_container">
            <BackCanvas onMonitorFocus={setFocusMonitor}/>
            <div className="constructor__container">

                <MyGlobalContext.Provider
                    value={{
                    canvas: new InsertState(canvas.current),
                    setWidth: setWidth,
                    setHeight: setHeight,
                    }}>

                    <Header/>
                    <Body/>

                </MyGlobalContext.Provider>
            </div>
        </div>
    );
}

export default App;
