import React, { FunctionComponent } from 'react';

interface OwnProps {
    name:string,
    event:()=>void
}

type Props = OwnProps;

const NavItem: FunctionComponent<Props> = (props) => {

  return (
      <li>
            <span onClick={props.event}> {props.name}</span>
      </li>
  );
};

export default NavItem;
