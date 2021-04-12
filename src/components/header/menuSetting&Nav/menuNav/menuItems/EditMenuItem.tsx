// outer
import React, {FunctionComponent, MutableRefObject, useState} from 'react';


// local
import {useGlobalContext} from "../../../../../App";
import {ConstructorCanvas} from "../../../../../threejs/constructorCanvas";
import MenuOptions from "../../menuOptions/MenuOptions";
import {log} from "util";


interface OwnProps {
}

type Props = OwnProps;

const EditMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState, setOptionsState] = useState(false)

    const context = useGlobalContext()
    let canvasObject = context.canvas as MutableRefObject<ConstructorCanvas>

    const options = [
        {name: "iPhone", event: canvasObject.current.addIphone},
        {name: "iPad", event: canvasObject.current.addIpad},
        {name: "Macbook", event: canvasObject.current.addMac}
    ]


    return (
        <li style={{position: "relative"}}>
            <span onClick={() => setOptionsState(prev => !prev)}> Insert </span>
            {optionsState &&
            <div className="option-module--options--1VaAT">
              <div className="option-module--option--1LMwC null" onClick={()=>{console.log("Undo")}}>
                <div className="option-module--icon--1zfpu" >
                  <svg version="1.1" id="Capa_1" x="0px" width="20px" height="20px" y="0px" viewBox="0 0 436.48 436.48">
                    <path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,122.24v192h192l-77.12-77.12
 			c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,139.627,49.173,162.027,117.333l50.453-16.64
 			C407.147,208.213,323.2,143.573,224,143.573z"></path>
                  </svg>
                </div>
                <span>Undo</span></div>
              <div className="option-module--option--1LMwC option-module--disabled--2czkJ" onClick={()=>{console.log("Redo")}}>
                <div className="option-module--icon--1zfpu" >
                  <svg version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 436.48 436.48">
                    <path d="M359.573,199.04c-39.253-34.453-90.667-55.467-147.093-55.467c-99.2,0-183.147,64.64-212.48,154.027l50.453,16.64
 			c22.4-68.16,86.4-117.333,162.027-117.333c41.707,0,79.573,15.36,109.12,40.213l-77.12,77.12h192v-192L359.573,199.04z"></path>
                  </svg>
                </div>
                <span>Redo</span></div>
            </div>
            }
        </li>
    );
};


export default EditMenuItem;
