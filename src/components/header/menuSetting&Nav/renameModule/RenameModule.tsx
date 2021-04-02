// outer
import React, {FunctionComponent} from 'react';


//local
import "./renameModule.scss"

interface OwnProps {
}

type Props = OwnProps;

const RenameModule: FunctionComponent<Props> = (props) => {

    return (
        <>
                <input type="text" className="rename-module__input" placeholder="Name"/>
                <label htmlFor="name" className="rename-module__label">Name</label>
        </>);
};

export default RenameModule;
