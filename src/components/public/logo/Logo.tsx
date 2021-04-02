//outer
import React, {FunctionComponent} from 'react';


//local
import "./logo.scss"
import logoSvg from "../../../annex/logo";


interface OwnProps {
}

type Props = OwnProps;

const Logo: FunctionComponent<Props> = (props) => {

    return (
        <>
            {logoSvg}
        </>
    )
}

export default Logo;
