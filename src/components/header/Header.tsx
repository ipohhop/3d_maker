//outer
import React, {FunctionComponent} from 'react';


//local
import "./header.scss"
import Logo from "../public/logo/Logo";
import HeaderInfo from "./menuSetting&Nav/HeaderInfo";


interface OwnProps {
}

type Props = OwnProps;

const Header: FunctionComponent<Props> = (props) => {

    return (
        <header className="header__container">
            <div className="header__left-block">
                <div className="header-logo__container">
                    <Logo/>
                </div>

                <HeaderInfo/>

            </div>


        </header>
    );
};

export default Header;
