// outer
import React, {FunctionComponent, MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


// local

import {Creator} from "../../../../threejs/root";
import {lightThreePoints} from "../../../../threejs/otherConstructors";
import {useGlobalContext} from "../../../../App";


interface OwnProps {
}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    const context = useGlobalContext()

    let canvasObject = context.canvas as MutableRefObject<Creator>

    useEffect(() => canvasObject.current.init(canvasContainer, true), [])

    useEffect(() => canvasObject.current.addLights(lightThreePoints()), [])




    return (
        <div ref={canvasContainer} className="canvas__inner-block">

        </div>
    );
};

export default CanvasElement;
