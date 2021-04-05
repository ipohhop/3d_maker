//outer
import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";



//local
import {creatPerspectiveCamera} from "../../threejs/scene&camera";
import {Creator, EventBackgroundCanvas} from "../../threejs/root";
import {lightThreePoints, planeCreator} from "../../threejs/otherConstructors";
import "./backCanvas.scss"


interface OwnProps {
}

type Props = OwnProps;

const BackCanvas: FunctionComponent<Props> = (props) => {
    const canvasContainer = useRef(null)

    const [width] = useState(window.innerWidth)
    const [height] = useState(window.innerHeight)

    const camera = useMemo(() => creatPerspectiveCamera(width, height, -1.4, 1.7, 1.5), [width, height])

    const canvas = useRef(new EventBackgroundCanvas(camera, width, height))

    useEffect(() => canvas.current.init(canvasContainer, false), [])

    useEffect(() => canvas.current.addLights(lightThreePoints()), [])

    useEffect(() => {
        canvas.current.startWindowResize()
        return canvas.current.stopWindowResize
    }, [])
    useEffect(() => {
        canvas.current.addElement(planeCreator(0.29, 0.21, 1, 1), "planeBack", false, -1.1, 1.68, 1)
    }, [])

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('models/back/scene.gltf', function (gltf) {
            canvas.current.addElement(gltf.scene, "background")
        }, undefined, function (error) {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('models/RobotExpressive.glb', function (gltf) {
            const element = gltf.scene
            element.receiveShadow=true
            element.castShadow=true
            element.scale.set(0.1,0.1,0.1)
            element.position.set(-1.45,1.3,0)
            element.rotateY(0.3)

            canvas.current.addElement(gltf.scene, "robot")
        }, undefined, function (error) {
            console.error(error)
        })
    }, [])

    // useEffect(() => {
        // const ktx2Loader = new KTX2Loader()
        //     .setTranscoderPath( 'js/libs/basis/' )
        //     .detectSupport( renderer );
        //
        // const loader = new GLTFLoader();
        // loader.setKTX2Loader( ktx2Loader );
        // loader.setMeshoptDecoder( MeshoptDecoder );
    //     loader.load('models/coffeemat.glb', function (gltf) {
    //         const element = gltf.scene
    //         console.log(element)
    //         element.position.set(-1,1.3,0)
    //         element.rotateY(0.3)
    //
    //         canvas.current.addElement(gltf.scene, "coffee")
    //     }, undefined, function (error) {
    //         console.error(error)
    //     })
    // }, [])


    useEffect(()=>{
        canvas.current.clickOnMonitor()
    },[])


    return (

        <>
            <div ref={canvasContainer} className="backCanvas__container"
                 style={{width: "100vw", height: "100vh", position: "fixed", zIndex: -1}}/>
        </>

    );
};

export default BackCanvas;
