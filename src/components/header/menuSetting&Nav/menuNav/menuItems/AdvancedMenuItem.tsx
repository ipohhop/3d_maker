// outer
import React, {FunctionComponent} from 'react';
import {useGlobalContext} from "../../../../../App";



// local




interface OwnProps {}

type Props = OwnProps;

const AdvancedMenuItem: FunctionComponent<Props> = (props) => {


    const context = useGlobalContext()
    let menuStatus = context.leftMenuStatus[1] as React.Dispatch<React.SetStateAction<any>>

    return (
        <li style={{position:"relative"}}>
            <span onClick={()=>menuStatus({type:"advanced",props:{}})}> Advanced </span>
        </li>
    );
};


export default AdvancedMenuItem;
