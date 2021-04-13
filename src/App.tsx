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
    canvas: InsertState | any,
    width: [number, React.Dispatch<React.SetStateAction<number>>] | number,
    height: [number, React.Dispatch<React.SetStateAction<number>>] | number,
    leftMenuStatus:  [string, React.Dispatch<React.SetStateAction<string>>] | string
}


const MyGlobalContext = createContext<GlobalContent>({
    canvas: 1,
    width: 500,
    height: 500,
    leftMenuStatus: ""
})

export const useGlobalContext = () => useContext(MyGlobalContext)


function App() {

    const [focusMonitor, setFocusMonitor] = React.useState(false)

// creat canvas-constructor

    const width = useState(500)
    const height = useState(500)
    const camera = useMemo(() => creatPerspectiveCamera(500, 500, 0, 0, 45.5),[] )
    // const canvas = useRef(new ConstructorCanvas(camera, width, height))

    const canvas = useState(new ConstructorCanvas(camera, 500, 500))
    const insertState = useRef(new InsertState(canvas) )

    const leftMenuStatus = useState("")


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
                        canvas: insertState.current,
                        width: width,
                        height: height,
                        leftMenuStatus: leftMenuStatus
                    }}>

                    <Header/>
                    <Body/>

                </MyGlobalContext.Provider>
            </div>
        </div>
    );
}

export default App;
