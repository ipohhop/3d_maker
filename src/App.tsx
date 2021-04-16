// outer
import React, {createContext, Dispatch, SetStateAction, useContext, useMemo, useRef, useState} from 'react';

// local
import './App.css';
import Body from './components/body/Body';
import Header from "./components/header/Header";
import BackCanvas from "./components/backCanvas/BackCanvas";
import {creatPerspectiveCamera} from "./threejs/scene&camera";
import {ConstructorCanvas} from "./threejs/constructorCanvas";
import {InsertState} from "./classConstructors";
import {EventBackgroundCanvas} from "./threejs/backfroundCanvas";



type GlobalContent = {
    canvas: InsertState | any,
    leftMenuStatus: [any, React.Dispatch<React.SetStateAction<any>>] | string ,
    backCanvasObject :EventBackgroundCanvas | undefined,
    setBackCanvasPosition:Dispatch<SetStateAction<any>> | undefined
}

const MyGlobalContext = createContext<GlobalContent>({
    canvas: 1,
    leftMenuStatus: "",
    backCanvasObject : undefined,
    setBackCanvasPosition:undefined
})

export const useGlobalContext = () => useContext(MyGlobalContext)
type onMonitor = number[]

function setOnMonitorStatus(setCallback:[boolean, React.Dispatch<React.SetStateAction<boolean>>]) {

    return function onMonitorFocus(data: onMonitor) {
        const callbackValue = setCallback[0]
        const setCallbackFunc = setCallback[1]

        const onMonitorPosition: onMonitor = [-0.5, 1.72, 0.33]

        if (data[0] === onMonitorPosition[0] && data[1] === onMonitorPosition[1] && data[3] === onMonitorPosition[3]) {
            if (!callbackValue)setCallbackFunc(true)
            return
        }
        if (callbackValue)setCallbackFunc(false)
        return
    }
}

function App() {

    const [backCanvasObject, setbackCanvasObject] = React.useState()
    const backCanvasPosition = useState(false)

    // creat canvas-constructor
    const camera = useMemo(() => creatPerspectiveCamera(800, 600, 0, 0, 45.5), [])

    const canvas = useState(new ConstructorCanvas(camera, 800, 600))
    const insertState = useRef(new InsertState(canvas))

    const leftMenuStatus = useState({
        type:"",
        props:{}
    })


    if (!backCanvasPosition[0]) {
        return <div className="App_container">
            <BackCanvas backCanvasObject={setbackCanvasObject} setBackCanvasPosition={setOnMonitorStatus(backCanvasPosition)}/>
        </div>
    }

    return (
        <div className="App_container">
            <BackCanvas backCanvasObject={setbackCanvasObject} setBackCanvasPosition={setOnMonitorStatus(backCanvasPosition)}/>
            <div className="constructor__container">

                <MyGlobalContext.Provider
                    value={{
                        canvas: insertState.current,
                        leftMenuStatus: leftMenuStatus,
                        backCanvasObject:backCanvasObject,
                        setBackCanvasPosition : setOnMonitorStatus(backCanvasPosition)
                    }}>

                    <Header/>
                    <Body/>

                </MyGlobalContext.Provider>
            </div>
        </div>
    );
}

export default App;
