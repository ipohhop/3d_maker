//outer
import React, {FunctionComponent} from 'react';

//local
import "./menuNav.scss"
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
