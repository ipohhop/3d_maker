// outer
import React, {FunctionComponent, MutableRefObject, useState} from 'react';




// local
import {useGlobalContext} from "../../../../../App";
import {ConstructorCanvas} from "../../../../../threejs/constructorCanvas";
import MenuOptions from "../../menuOptions/MenuOptions";



interface OwnProps {}

type Props = OwnProps;

const InsertMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

    const context = useGlobalContext()
    let canvasObject = context.canvas as MutableRefObject<ConstructorCanvas>

    const options =[
        {name: "iPhone", event: canvasObject.current.addIphone},
        {name: "iPad", event: canvasObject.current.addIpad},
        {name: "Macbook", event: canvasObject.current.addMac}
    ]


    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> Insert </span>
            { optionsState && < > {<MenuOptions optionsItems={options}/>} </>}
        </li>
    );
};


export default InsertMenuItem;
