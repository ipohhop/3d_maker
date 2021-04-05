// outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";



// local
import {creatPerspectiveCamera} from "../../../../threejs/scene&camera";
import {Creator} from "../../../../threejs/root";
import {generationCubs, lightThreePoints} from "../../../../threejs/otherConstructors";


interface OwnProps {
}

type Props = OwnProps;

const CanvasElement: FunctionComponent<Props> = () => {
    const canvasContainer = useRef(null)

    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(600)

    const camera = useMemo(() => creatPerspectiveCamera(width, height, 0, 0, 0), [width, height])

    const canvas = useRef(new Creator(camera, width, height))

    useEffect(() => {
        canvas.current.init(canvasContainer, false)
    }, [])

    useEffect(() => {
        canvas.current.addLights(lightThreePoints())
    }, [])

    // useEffect(() => {
    //     const loader = new GLTFLoader();
    //     loader.load( 'models/back/scene.gltf', function ( gltf ) {
    //         console.log( gltf.scene)
    //         canvas.current.scene.add( gltf.scene );
    //
    //     }, undefined, function ( error ) {
    //         console.error( error );
    //     } );
    //
    // }, [])

    return (
        <div ref={canvasContainer} className="canvas__inner-block">

        </div>
    );
};

export default CanvasElement;
