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

    useEffect(() => {
        const loader = new GLTFLoader();

        let pathIpad = 'models/apple/ipad/scene.gltf'
        // let pathIphone = 'models/apple/iphone11/scene.gltf'

        loader.load(pathIpad, function (gltf) {
            const element = gltf.scene
            element.scale.set(0.5, 0.5, 0.5)
            element.name = "ipad"


            canvasObject.current.addElement(element, "ipad")
        }, undefined, function (error) {
            console.error(error)
        })
    }, [])



    useEffect(() => {
        const loader = new GLTFLoader();

        let pathIpad = 'models/apple/ipad/scene.gltf'
        // let pathIphone = 'models/apple/iphone11/scene.gltf'

        loader.load(pathIpad, function (gltf) {
            const element = gltf.scene
            element.scale.set(0.5, 0.5, 0.5)
            element.position.set(1,1,6)
            element.name = "ipad2"


            canvasObject.current.addElement(element, "ipad2")
        }, undefined, function (error) {
            console.error(error)
        })
    }, [])


    return (
        <div ref={canvasContainer} className="canvas__inner-block">

        </div>
    );
};

export default CanvasElement;
