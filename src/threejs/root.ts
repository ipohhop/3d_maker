// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React from 'react'


// local
import {creatScene} from "./scene&camera";
import {Camera, Grid, Light, SceneSettings} from "./threejsTypes";

//  !! function for creat canvas object

export class BaseCreator {

    protected scene: THREE.Scene;
    protected renderer: THREE.WebGLRenderer;
    protected startAnimation: () => void;
    protected camera: Camera;
    protected controls: OrbitControls | undefined;
    protected width: number;
    protected height: number;
    protected mountTime: boolean;
    protected canvas: HTMLCanvasElement | undefined;
    protected onWindowResize: () => void;
    init: (container: React.MutableRefObject<any>, orbitControl?: boolean) => void;
    startWindowResize: () => void;
    stopWindowResize: () => void;

    constructor(camera: Camera, width: number, height: number) {
        this.camera = camera
        this.scene = creatScene()
        this.width = width
        this.height = height
        this.mountTime = true
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        })

        this.init = (container: React.MutableRefObject<any>, orbitControl: boolean = true) => {
            // enter size render window
            (<THREE.WebGLRenderer>this.renderer).setSize(this.width, this.height);

            // creat canvas element
            this.canvas = (<THREE.WebGLRenderer>this.renderer).domElement

            // add canvas element in DOM , "if" for don't canvas add in DOM more 1 time if useEffect call more 1 time

            if (this.mountTime) container.current.appendChild(this.canvas) && (this.mountTime = false)

            // add orbit control to canvas
            if (!(this.camera instanceof THREE.CubeCamera) && orbitControl) this.controls = new OrbitControls(this.camera, this.canvas);

            // start animation
            this.startAnimation()
        }

        this.startWindowResize = () => {
            // resize event on window
            window.addEventListener('resize', this.onWindowResize)
        }

        this.stopWindowResize = () => {
            // delete resize event on window
            window.removeEventListener('resize', this.onWindowResize)
        }

        // start render
        this.startAnimation = () => {
            (<THREE.WebGLRenderer>this.renderer).render(this.scene, <THREE.PerspectiveCamera>this.camera);
            window.requestAnimationFrame(this.startAnimation);
        };

        this.onWindowResize = () => {
            if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = window.innerWidth / window.innerHeight;
            if (!(camera instanceof THREE.CubeCamera)) camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}


//

export class Creator extends BaseCreator {

    protected element: THREE.Mesh | THREE.Mesh[] | null;
    addElement: (element: (THREE.Mesh | THREE.Mesh[]), inGroup?: boolean, x?: number, y?: number, z?: number) => void;
    addLights: (lights: (Light | Light[])) => void;
    addGrid: (grid: (Grid | Grid[])) => void;
    settingScene: (objectSettings: SceneSettings) => void;
    tornPerspectiveCamera: (aspect?: number, near?: number, far?: number, x?: number, y?: number, z?: number) => void;

    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)
        this.width = width
        this.height = height
        this.camera = camera
        this.element = null

        this.addElement = (element: THREE.Mesh | THREE.Mesh[], inGroup: boolean = false, x: number = 0, y: number = 0, z: number = 0) => {

            if (inGroup) {
                const group = new THREE.Group();
                if (element instanceof Array) (<THREE.Group>group).add(...element)
                if (element instanceof THREE.Mesh) group.add(element)
                group.position.set(x, y, z)
                this.scene.add(group)
                return
            }

            element instanceof Array
                ? this.scene.add(...element)
                : this.scene.add(element);
        }

        this.addLights = (lights: Light | Light[]) => {
            if (lights) lights instanceof Array
                ? this.scene.add(...lights)
                : this.scene.add(lights);
        }

        this.addGrid = (grid: Grid | Grid[]) => {
            grid instanceof Array
                ? this.scene.add(...grid)
                : this.scene.add(grid);
        }

        this.settingScene = (objectSettings: SceneSettings) => {
            if (objectSettings.background) this.scene.background = objectSettings.background
            if (objectSettings.fog) this.scene.fog = objectSettings.fog
            if (objectSettings.overrideMaterial) this.scene.overrideMaterial = objectSettings.overrideMaterial
            if (objectSettings.autoUpdate) this.scene.autoUpdate = objectSettings.autoUpdate
            if (objectSettings.environment) this.scene.environment = objectSettings.environment
        }

        this.tornPerspectiveCamera = (aspect?: number, near?: number, far?: number, x?: number, y?: number, z?: number) => {
            if (this.camera instanceof THREE.PerspectiveCamera) {
                if (aspect) this.camera.aspect = aspect
                if (near === 0 || near) this.camera.near = near
                if (far === 0 || far) this.camera.far = far
                if (x === 0 || x) this.camera.position.x = x
                if (y === 0 || y) this.camera.position.y = y
                if (z === 0 || z) this.camera.position.z = z
            }
        }
    }
}
