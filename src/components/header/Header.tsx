//outer
import React, {FunctionComponent} from 'react';


//local
import "./header.scss"
import Logo from "../public/logo/Logo";
import HeaderInfo from "./menuSetting&Nav/HeaderInfo";
import {useGlobalContext} from "../../App";


interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()

    let canvasObject = context.canvas.activeCanvas



    return (
        <header className="header__container">
            <div className="header__left-block">
                <div className="header-logo__container">
                    <Logo/>
                </div>
                <HeaderInfo/>
            </div>
            <div onClick={()=>{
                }} id="body_button">
                <div className="button_hola"><span> Out Door </span></div>
            </div>
        </header>
    );
};


export default Header;
