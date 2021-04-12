// outer
import React, {FunctionComponent} from 'react';


// local
import "./menuOptions.scss"
import {objectItem} from "../menuNav/MenuNav";


interface OwnProps {
    optionsItems: objectItem[]
}

type Props = OwnProps;

const MenuOptions: FunctionComponent<Props> = (props) => {


    return (
        <div className="option-module--options--1VaAT">
            {props.optionsItems.map((item, index) => {
                return <div className="option-module--option--1LMwC null">
                    <div className="option-module--icon--1zfpu"/>
                    <span onClick={item.event}>{item.name}</span>
                </div>
            })}
        </div>
    );
};

export default MenuOptions;


// <div className="option-module--option--1LMwC null">
//     <div className="option-module--icon--1zfpu"></div>
//     <span>Text</span></div>
// <div className="option-module--option--1LMwC null">
//     <div className="option-module--icon--1zfpu"></div>
//     <span>Device</span></div>
// <div className="option-module--option--1LMwC null">
//     <div className="option-module--icon--1zfpu"></div>
//     <span>Image</span></div>
