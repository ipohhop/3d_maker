import * as THREE from "three";
import {Texture} from "three/src/textures/Texture";
import {FogBase} from "three/src/scenes/Fog";
import {Material} from "three/src/materials/Material";


export function creatScene(background: THREE.Color | THREE.Texture | THREE.WebGLCubeRenderTarget | null =null ,
                           fog?: FogBase | null ,
                           overrideMaterial?: Material | null  ,
                           autoUpdate?: boolean ,
                           environment?: null | Texture
) {
    // creat scene object
    const scene = new THREE.Scene()

    // add effect and settings in scene object

    if (background) scene.background = background
    if (fog) scene.fog = fog
    if (overrideMaterial) scene.overrideMaterial = overrideMaterial
    if (autoUpdate) scene.autoUpdate = autoUpdate
    if (environment) scene.environment = environment

    return scene
}

export function creatPerspectiveCamera(width:number,height:number,x:number=0,y:number=0,z:number=5){
    const  cameraPoint = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
    cameraPoint.position.z = z;
    cameraPoint.position.x = x;
    cameraPoint.position.y = y;
    // const target = new THREE.Vector3(1, 2, 3)
    // cameraPoint.getWorldDirection(target)
    // cameraPoint.focus=122222
    cameraPoint.rotateX(0)
    cameraPoint.rotateY(-0.5)
    cameraPoint.rotateZ(0)
    return cameraPoint
}


// tween function for camera

//
// function cameraToMarker(marker) {
//     const currentCamPosition = {x: marker.cameraPositionX, y: camera.position.y, z: marker.cameraPositionZ};
//     const storedMarkerPosition = new THREE.Vector3(marker.positionX, marker.positionY, marker.positionZ);
//     const newCameraTarget = getNewPointOnVector(currentCamPosition, storedMarkerPosition);
//     const markerPosition = new THREE.Vector3(...Object.values(newCameraTarget));
//     const startRotation = new THREE.Euler().copy(camera.rotation);
//     camera.lookAt(storedMarkerPosition);
//     const endRotation = new THREE.Euler().copy(camera.rotation);
//     camera.rotation.copy(startRotation);
//     new TWEEN.Tween(camera.rotation)
//         .to(
//             {
//                 x: endRotation.x,
//                 y: endRotation.y,
//                 z: endRotation.z,
//             }, 500)
//         .easing(TWEEN.Easing.Quadratic.InOut)
//         .onComplete(() => {
//             new TWEEN.Tween(camera.position)
//                 .to({
//                     x: marker.cameraPositionX,
//                     y: camera.position.y,
//                     z: marker.cameraPositionZ,
//                 })
//                 .easing(TWEEN.Easing.Quadratic.InOut)
//                 .onUpdate(() => {
//                     camera.lookAt(storedMarkerPosition);
//                 })
//                 .onComplete(() => {
//                     camera.lookAt(storedMarkerPosition);
//                     radius = Math.hypot(...Object.values(markerPosition));
//                     phi = Math.acos(markerPosition.y / radius);
//                     theta = Math.atan2(markerPosition.z, markerPosition.x);
//                     lon = THREE.Math.radToDeg(theta);
//                     lat = 90 - THREE.Math.radToDeg(phi);
//                 })
//                 .start();
//         })
//         .start();
// }
