// outer
import React, {FunctionComponent, useReducer, useState} from 'react';



// local
import "./leftSettingMenu.scss"
import BackgroundSettings from "./background/BackgroundSettings";
import AdvancedSettings from "./advanced/AdvancedSettings";
import {useGlobalContext} from "../../../App";


interface OwnProps {}

type Props = OwnProps;

const LeftSettingMenu: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    const menuStatus = context.leftMenuStatus[0]


    switch (menuStatus) {
        case "background":
            return <div className="left-settings-menu__container">
                    <BackgroundSettings/>
            </div>
        case "advanced":
            return <div className="left-settings-menu__container">
                <AdvancedSettings/>
            </div>

        default:
            return <div className="left-settings-menu__container"/>


    }

};

export default LeftSettingMenu;
