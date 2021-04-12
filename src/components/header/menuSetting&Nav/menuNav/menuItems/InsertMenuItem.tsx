// outer
import React, {FunctionComponent, useState} from 'react';




// local
import {useGlobalContext} from "../../../../../App";
import MenuOptions from "../../menuOptions/MenuOptions";



interface OwnProps {}

type Props = OwnProps;

const InsertMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

    const context = useGlobalContext()
    let canvasObject = context.canvas.activeCanvas

    const options =[
        {name: "iPhone", event: canvasObject.addIphone},
        {name: "iPad", event: canvasObject.addIpad},
        {name: "Macbook", event: canvasObject.addMac}
    ]


    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> Insert </span>
            { optionsState && < > {<MenuOptions optionsItems={options}/>} </>}
        </li>
    );
};


export default InsertMenuItem;
