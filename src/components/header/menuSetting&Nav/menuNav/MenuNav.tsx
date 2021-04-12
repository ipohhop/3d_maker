//outer
import React, {FunctionComponent, MutableRefObject} from 'react';

//local
import NavItem from "./NavItem";
import "./menuNav.scss"
import {useGlobalContext} from "../../../../App";
import {ConstructorCanvas} from "../../../../threejs/constructorCanvas";
import FileMenuItem from "./menuItems/FileMenuItem";
import EditMenuItem from "./menuItems/EditMenuItem";
import InsertMenuItem from "./menuItems/InsertMenuItem";
import BackgroundMenuItem from "./menuItems/BackgroundMenuItem";
import AdvancedMenuItem from "./menuItems/AdvancedMenuItem";


interface OwnProps {
}

type Props = OwnProps;

export type objectItem = {
    name: string,
    event: () => any | void
}


const MenuNav: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    let canvasObject = context.canvas as MutableRefObject<ConstructorCanvas>


    type menuItemsType = { name: string, event: () => any, optionsItems: objectItem[] | any[] }

    const menuItems: menuItemsType[] = [
        {name: "File", event: () => null, optionsItems: []},
        {name: "Edit", event: () => null, optionsItems: []},
        {
            name: "Insert", event: () => null, optionsItems: [
                {name: "iPhone", event: canvasObject.current.addIphone},
                {name: "iPad", event: canvasObject.current.addIpad},
                {name: "Macbook", event: canvasObject.current.addMac}
            ]
        },
        {name: "Background", event: () => null, optionsItems: []},
        {name: "Advanced", event: () => null, optionsItems: []},
    ]


    return (
        <nav className="header__nav">
            <ul>
                <FileMenuItem/>
                <EditMenuItem/>
                <InsertMenuItem/>
                <BackgroundMenuItem/>
                <AdvancedMenuItem/>
            </ul>
        </nav>
    );
};

export default MenuNav;
