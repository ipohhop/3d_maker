// outer
import React, {FunctionComponent} from 'react';


// local
import "./canvasContainer.scss"
import CanvasElement from "./CanvasElement";


interface OwnProps {
}

type Props = OwnProps;

const CanvasContainer: FunctionComponent<Props> = (props) => {

    return (
        <div className="canvas__container">
            <CanvasElement/>
        </div>
    );
};

export default CanvasContainer;
