// outer
import React, {createContext, MutableRefObject, useContext, useMemo, useRef, useState} from 'react';

// local
import './App.css';
import Body from './components/body/Body';
import Header from "./components/header/Header";
import BackCanvas from "./components/backCanvas/BackCanvas";
import {creatPerspectiveCamera} from "./threejs/scene&camera";
import {Creator} from "./threejs/root";
import {ConstructorCanvas} from "./threejs/constructorCanvas";





type GlobalContent = {
    canvas: ConstructorCanvas | MutableRefObject<ConstructorCanvas>,
    setWidth: React.Dispatch<React.SetStateAction<number>> | undefined,
    setHeight: React.Dispatch<React.SetStateAction<number>> | undefined,
    state: ConstructorCanvas[] | MutableRefObject<ConstructorCanvas>[]
}


const MyGlobalContext = createContext<GlobalContent>({
    canvas: new ConstructorCanvas(creatPerspectiveCamera(500, 500, 0, 0, 26.5), 500, 500),
    setWidth: undefined,
    setHeight: undefined,
    state: [new ConstructorCanvas(creatPerspectiveCamera(500, 500, 0, 0, 26.5), 500, 500)],
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
                    canvas: canvas,
                    setWidth: setWidth,
                    setHeight: setHeight,
                    state: [canvas],}}>

                    <Header/>
                    <Body/>

                </MyGlobalContext.Provider>
            </div>
        </div>
    );
}

export default App;
