// outer
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';


// local
import {lightThreePointsConstructions} from "../../../../threejs/otherConstructors";
import {useGlobalContext} from "../../../../App";



interface OwnProps {}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    // get context canvas object
    const context = useGlobalContext()
    const canvasObject = context.canvas

    const [canvas, setcanvas] = useState(context.canvas.activeCanvas);

    useEffect(()=>{
        canvasObject.stateFunction = setcanvas
    },[])


    // paste canvas constructor element in div
    useEffect(() => {
        console.log("active canvas:",canvas)
        canvas.init(canvasContainer, true)},[canvas])

    // add light's  in scene
    useEffect(() => canvas.addLights(lightThreePointsConstructions()), [])

    // add light's  in scene
    useEffect(() => canvas.checkElementEvent(context.leftMenuStatus), [])


    return (<div ref={canvasContainer} className="canvas__inner-block"/>)
};

export default CanvasElement;
