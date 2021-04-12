// outer
import React, {FunctionComponent, useState} from 'react';



// local




interface OwnProps {}

type Props = OwnProps;

const BackgroundMenuItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> Background </span>
        </li>
    );
};


export default BackgroundMenuItem;
