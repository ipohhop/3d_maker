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
    leftMenuStatus: [string, React.Dispatch<React.SetStateAction<string>>] | string
}

const MyGlobalContext = createContext<GlobalContent>({
    canvas: 1,
    leftMenuStatus: ""
})

export const useGlobalContext = () => useContext(MyGlobalContext)
type onMonitor = number[]

function setOnMonitorStatus(setCallback: React.Dispatch<React.SetStateAction<any>>) {

    return function onMonitorFocuse(data: onMonitor) {
        const setCallbackFunc = setCallback

        const onMonitorPosition: onMonitor = [-0.5, 1.72, 0.33]

        if (data[0] === onMonitorPosition[0] && data[1] === onMonitorPosition[1] && data[3] === onMonitorPosition[3]) {
            setCallbackFunc(true)
            return
        }
        setCallbackFunc(false)
        return
    }
}

function App() {

    const [focusMonitor, setFocusMonitor] = React.useState(false)
    const [backCanvasPosition, setBackCanvasPosition] = useState(false)

    // creat canvas-constructor
    const camera = useMemo(() => creatPerspectiveCamera(500, 500, 0, 0, 45.5), [])

    const canvas = useState(new ConstructorCanvas(camera, 500, 500))
    const insertState = useRef(new InsertState(canvas))

    const leftMenuStatus = useState("")


    if (!backCanvasPosition) {
        return <div className="App_container">
            <BackCanvas onMonitorFocus={setFocusMonitor} setBackCanvasPosition={setOnMonitorStatus(setBackCanvasPosition)}/>
        </div>
    }

    return (
        <div className="App_container">
            <BackCanvas onMonitorFocus={setFocusMonitor} setBackCanvasPosition={setOnMonitorStatus(setBackCanvasPosition)}/>
            <div className="constructor__container">

                <MyGlobalContext.Provider
                    value={{
                        canvas: insertState.current,
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
