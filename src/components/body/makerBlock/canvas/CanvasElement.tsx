// outer
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';


// local
import {lightThreePointsConstructions} from "../../../../threejs/otherConstructors";
import {useGlobalContext} from "../../../../App";
import {log} from "util";



interface OwnProps {}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    // get context canvas object
    const context = useGlobalContext()
    const canvasObject = context.canvas

    const [canvas, setCanvas] = useState(context.canvas.activeCanvas);

    useEffect(()=>{
        canvasObject.stateFunction = setCanvas
    },[])


    // paste canvas constructor element in div
    useEffect(() => {
        console.log("active canvas for init:",canvas);
        (canvasContainer.current as unknown as HTMLElement).innerHTML = "";

        canvas.canvas
        ? setTimeout(()=>{
                // canvas.render()
                // canvas.startAnimation()
                // (canvasContainer.current as unknown as HTMLElement).appendChild(canvas.canvas)
                canvas.init(canvasContainer, true)
            },3000)
        :canvas.init(canvasContainer, true)




    },[])


    // add light's  in scene
    useEffect(() => canvas.addLights(lightThreePointsConstructions()), [])

    // add light's  in scene
    useEffect(() => canvas.checkElementEvent(context.leftMenuStatus), [])


    return (<div ref={canvasContainer} className="canvas__inner-block"/>)
};

export default CanvasElement;
