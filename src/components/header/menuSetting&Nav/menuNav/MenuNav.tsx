//outer
import React, {FunctionComponent, MutableRefObject} from 'react';

//local
import NavItem from "./NavItem";
import "./menuNav.scss"
import {useGlobalContext} from "../../../../App";
import {Creator} from "../../../../threejs/root";
import {ConstructorCanvas} from "../../../../threejs/constructorCanvas";


type creatItem = {
    event: () => any,
    name: string
}

function creatOption(objects: creatItem[]) {
    return <div>
        {objects.map((item, index) => <div onClick={item.event}> {item.name}</div>)}
    </div>
}


interface OwnProps {
}

type Props = OwnProps;

export type objectItem = {
    name: string,
    event: () => any |void
}



const MenuNav: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    let canvasObject = context.canvas as MutableRefObject<ConstructorCanvas>


    type menuItemsType = { name: string, event: () => any, optionsItems: objectItem[] | any[] }

    const menuItems:menuItemsType[] = [
        {name: "File", event: () => null,optionsItems:[]},
        {name: "Edit", event: () => null,optionsItems:[]},
        {name: "Insert", event: () => null,optionsItems:[{name:"iPhone",event:canvasObject.current.addIphone}]},
        {name: "Background", event: () => null,optionsItems:[]},
        {name: "Advanced", event: () => null,optionsItems:[]},
    ]




    return (
        <nav className="header__nav">
            <ul>
                {menuItems.map((item, index) => {
                    return <NavItem key={index} name={item.name} event={item.event} optionsItems={item.optionsItems}/>
                })}
            </ul>
        </nav>
    );
};

export default MenuNav;
