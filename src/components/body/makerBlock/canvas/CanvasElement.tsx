// outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';



// local
import {creatPerspectiveCamera} from "../../../../threejs/scene&camera";
import {Creator} from "../../../../threejs/root";
import {creatBox, generationCubs, lightThreePoints} from "../../../../threejs/otherConstructors";



interface OwnProps {}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = (props) => {
    const canvasContainer= useRef(null)

    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(600)

    const camera = useMemo(()=>creatPerspectiveCamera(width,height,0,10,21),[width,height])

    const canvas= useRef(new Creator(camera,width,height))

    useEffect(() => {
        canvas.current.init(canvasContainer, true)
    }, [])

    useEffect(()=> {
        canvas.current.addElement(generationCubs(6, 6))
        canvas.current.addLights(lightThreePoints())
    },[])

    useEffect(()=> {
        canvas.current.startWindowResize()
        return canvas.current.stopWindowResize()
    },[])

  return (
      <div ref={canvasContainer} className="canvas__inner-block">

      </div>
  );
};

export default CanvasElement;
