// outer
import React, {FunctionComponent, useEffect, useRef} from 'react';



// local

import {lightThreePoints} from "../../../../threejs/otherConstructors";
import {useGlobalContext} from "../../../../App";


interface OwnProps {
}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    const context = useGlobalContext()

    let canvasObject = context.canvas.activeCanvas

    useEffect(() => {
        console.log("init!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        canvasObject.init(canvasContainer, true)
    }, [canvasObject.elements])

    useEffect(() => canvasObject.addLights(lightThreePoints()), [canvasObject])


    return (
        <div ref={canvasContainer} className="canvas__inner-block">

        </div>
    );
};

export default CanvasElement;
