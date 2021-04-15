// outer
import React, {FunctionComponent, useEffect, useRef} from 'react';


// local
import {lightThreePointsConstructions} from "../../../../threejs/otherConstructors";
import {useGlobalContext} from "../../../../App";



interface OwnProps {}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    // get context canvas object
    const context = useGlobalContext()
    const canvasObject = context.canvas.activeCanvas

    // paste canvas constructor element in div
    useEffect(() => {canvasObject.init(canvasContainer, true)},[canvasObject])

    // add light's  in scene
    useEffect(() => canvasObject.addLights(lightThreePointsConstructions()), [])

    // add light's  in scene
    useEffect(() => canvasObject.checkElementEvent(context.leftMenuStatus), [])


    return (<div ref={canvasContainer} className="canvas__inner-block"/>)
};

export default CanvasElement;
