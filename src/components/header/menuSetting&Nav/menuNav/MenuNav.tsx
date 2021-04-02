//outer
import React, {FunctionComponent} from 'react';

//local
import NavItem from "./NavItem";
import "./menuNav.scss"



interface OwnProps {
}

type Props = OwnProps;


const menuItems = [
    {name: "File", event: () => null},
    {name: "Edit", event: () => null},
    {name: "Insert", event: () => null},
    {name: "Background", event: () => null},
    {name: "Advanced", event: () => null},
]


const MenuNav: FunctionComponent<Props> = (props) => {

    return (
        <nav className="header__nav">
            <ul>
                {menuItems.map((item, index) => {
                    return <NavItem key={index} name={item.name} event={item.event}/>
                })}
            </ul>
        </nav>
    );
};

export default MenuNav;
