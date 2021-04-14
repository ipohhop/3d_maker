//outer
import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef} from 'react';


//local
import "./header.scss"
import Logo from "../public/logo/Logo";
import HeaderInfo from "./menuSetting&Nav/HeaderInfo";
import {useGlobalContext} from "../../App";
import {EventBackgroundCanvas} from "../../threejs/root";


interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = () => {
    const buttonOutDoor = useRef(null)

    const context = useGlobalContext()

    const backCanvasObject = context.backCanvasObject as EventBackgroundCanvas

    useEffect(()=>{

        backCanvasObject.addHTMLElement("buttonOutDoor", buttonOutDoor.current as unknown as HTMLElement)
        backCanvasObject.clickOnMonitor(context.setBackCanvasPosition as Dispatch<SetStateAction<any>>,backCanvasObject.HTMLElements.buttonOutDoor)


    },[])



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
                <div ref={buttonOutDoor} className="button_hola" id="outDoor"><span> Out Door </span></div>
            </div>
        </header>
    );
};


export default Header;
