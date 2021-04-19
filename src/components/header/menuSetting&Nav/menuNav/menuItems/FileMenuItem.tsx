// outer
import React, {FunctionComponent, useState} from 'react';
import {useGlobalContext} from "../../../../../App";



// local




interface OwnProps {}

type Props = OwnProps;

const FileMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

    const context = useGlobalContext()
    let canvasObject = context.canvas.activeCanvas

    function save() {
        canvasObject.saveCanvasPng(context.fileName[0])
    }

    return (
        <li style={{position:"relative"}}>
            <span onClick={save}> Save </span>
        </li>
    );
};


export default FileMenuItem;
