// outer
import * as THREE from 'three';

export function lightThreePoints() {
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    return lights
}


export function versionTwo() {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;

    return new THREE.HemisphereLight(skyColor, groundColor, intensity);
}


export function versionThree() {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 10, 2);

    return light
}


export function creatGrid(width:number=100,height:number=100) {
    const helper = new THREE.GridHelper(100, 100);
    helper.position.y = -1;
    if (helper.material instanceof THREE.Material) helper.material.opacity = 0.25;
    if (helper.material instanceof THREE.Material) helper.material.transparent = true;
    return helper
}
