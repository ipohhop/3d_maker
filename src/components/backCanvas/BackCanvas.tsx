//outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

//local
import {creatPerspectiveCamera} from "../../threejs/scene&camera";
import {Creator} from "../../threejs/root";
import {lightThreePoints, planeCreator} from "../../threejs/otherConstructors";
import "./backCanvas.scss"

interface OwnProps {}

type Props = OwnProps;

const BackCanvas: FunctionComponent<Props> = (props) => {
    const canvasContainer = useRef(null)

    const [width] = useState(window.innerWidth)
    const [height] = useState(window.innerHeight)

    const camera = useMemo(() => creatPerspectiveCamera(width, height, -1.4, 1.7, 1.5), [width, height])

    const canvas = useRef(new Creator(camera, width, height))

    useEffect(() => canvas.current.init(canvasContainer, false), [])

    useEffect(() => canvas.current.addLights(lightThreePoints()), [])
    useEffect(() => {
        canvas.current.startWindowResize()
        return canvas.current.stopWindowResize
    }, [])
    useEffect(()=>{
        canvas.current.addElement(planeCreator(0.3,0.3,1,1),"planeBack",false,-1,1.8,1)

    },[])

    // useEffect(() => {
    //     const loader = new GLTFLoader();
    //     loader.load('models/back/scene.gltf', function (gltf) {
    //         console.log(gltf.scene)
    //         canvas.current.scene.add(gltf.scene)
    //     }, undefined, function (error) {
    //         console.error(error)
    //     })
    // }, [])
    return (

        <>
            <div ref={canvasContainer} className="backCanvas__container" style={{width:"100vw",height:"100vh",position:"fixed",zIndex:-1}}/>
        </>

    );
};

export default BackCanvas;
