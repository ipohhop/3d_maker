// outer
import React, {FunctionComponent} from 'react';


//local
import "./renameModule.scss"
import {useGlobalContext} from "../../../../App";

interface OwnProps {
}

type Props = OwnProps;

const RenameModule: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    const [fileName, setFileName] = context.fileName

    return (
        <>
            <input type="text" className="rename-module__input" placeholder="Name" value={fileName}
                   onChange={(e) => setFileName(e.target.value.trim())}/>
            <label htmlFor="name" className="rename-module__label">Name</label>
        </>);
};

export default RenameModule;
