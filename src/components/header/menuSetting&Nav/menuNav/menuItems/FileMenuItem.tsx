// outer
import React, {FunctionComponent, useState} from 'react';



// local




interface OwnProps {}

type Props = OwnProps;

const FileMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> File </span>
        </li>
    );
};


export default FileMenuItem;
