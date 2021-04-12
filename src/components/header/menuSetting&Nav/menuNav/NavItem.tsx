// outer
import React, {FunctionComponent, useState} from 'react';


// local
import MenuOptions from "../menuOptions/MenuOptions";
import {objectItem} from "./MenuNav";

interface OwnProps {
    name:string,
    event:()=>void,
    optionsItems: objectItem[] | any[]
}

type Props = OwnProps;

const NavItem: FunctionComponent<Props> = (props) => {
    const [optionsState,setOptionsState] = useState(false)

  return (
      <li style={{position:"relative"}}>
            <span onClick={()=>setOptionsState(prev=>!prev)}> {props.name}</span>

          {props.optionsItems && optionsState && < > {<MenuOptions optionsItems={props.optionsItems}/>} </>}

      </li>
  );
};

export default NavItem;
