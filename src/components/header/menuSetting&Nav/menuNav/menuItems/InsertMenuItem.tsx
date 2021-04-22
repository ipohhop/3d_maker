// outer
import React, {FunctionComponent, useEffect, useState} from 'react';




// local
import {useGlobalContext} from "../../../../../App";
import MenuOptions from "../../menuOptions/MenuOptions";




interface OwnProps {}

type Props = OwnProps;

const InsertMenuItem: FunctionComponent<Props> = () => {
    const [optionsState,setOptionsState] = useState(false)

    const context = useGlobalContext()
    let canvasObject = context.canvas.activeCanvas

    function addiPhone() {
        context.canvas.addInState()
        canvasObject.addIphone()
    }

    function addMacbook() {
        context.canvas.addInState()
        canvasObject.addMac()
    }

    function addiPad() {
        context.canvas.addInState()
        canvasObject.addIpad()
    }

    const options =[
        {name: "iPhone", event: addiPhone},
        {name: "iPad", event: addiPad},
        {name: "Macbook", event: addMacbook}
    ]

    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> Insert </span>
            { optionsState && < > {<MenuOptions key="1" optionsItems={options}/>} </>}
        </li>
    );
};



export default InsertMenuItem;
