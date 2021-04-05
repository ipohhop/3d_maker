// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React from 'react'


// local
import {creatScene} from "./scene&camera";
import {Camera, Elements, EventCallBack, Grid, Light, SceneSettings} from "./threejsTypes";
import {Object3D} from "three";

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

    elements: Elements;
    addLights: (lights: (Light | Light[])) => void;
    addGrid: (grid: (Grid | Grid[])) => void;
    settingScene: (objectSettings: SceneSettings) => void;
    tornPerspectiveCamera: (aspect?: number, near?: number, far?: number, x?: number, y?: number, z?: number) => void;
    addElement: (element: (THREE.Mesh | THREE.Mesh[] | THREE.Group), name: string, inGroup?: boolean, x?: number, y?: number, z?: number) => void;

    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)
        this.width = width
        this.height = height
        this.camera = camera
        this.elements = {
            groups: {},
            elements: {}
        }

        // method for add element in scene
        this.addElement = (element: THREE.Mesh | THREE.Mesh[] | THREE.Group, nameElement: string, inGroup: boolean = false, x: number = 0, y: number = 0, z: number = 0) => {

            // сообщение оперезаписи элемента
            if (nameElement in this.elements.groups || nameElement in this.elements.elements) console.log(`вы перезаписали элемент ${nameElement}`)

            //если element это group добавляем группу по name в объект elements.group[name] далее добавляем в сцену
            if (element instanceof THREE.Group) {
                this.elements.groups[nameElement] = element
                this.scene.add(element)
                return
            }
            //если группа создаем объект группы и заполняем элементом(ми) добавляем группу по name в объект elements.group[name] далее добавляем в сцену
            if (inGroup) {
                const group = new THREE.Group();
                if (element instanceof Array) {
                    (<THREE.Group>group).add(...element)
                }
                if (element instanceof THREE.Mesh) group.add(element)
                group.position.set(x, y, z)
                this.elements.groups[nameElement] = (<THREE.Group>group)
                this.scene.add(this.elements.groups[nameElement])

                return
            }

            //если не в группе по name в объект elements.group[name] далее добавляем в сцену
            if (element instanceof Array) {
                element.forEach((item, index) => {
                    this.elements.elements[nameElement + (index + 1)] = item
                    this.scene.add(item)
                })
            } else {
                element.position.set(x, y, z)
                this.elements.elements[nameElement] = element
                this.scene.add(element);
            }
        }

        // method for add lights in scene
        this.addLights = (lights: Light | Light[]) => {
            if (lights) lights instanceof Array
                ? this.scene.add(...lights)
                : this.scene.add(lights);
        }
        // method for add grid in scene
        this.addGrid = (grid: Grid | Grid[]) => {
            grid instanceof Array
                ? this.scene.add(...grid)
                : this.scene.add(grid);
        }

        // method for setting parameters scene
        this.settingScene = (objectSettings: SceneSettings) => {
            if (objectSettings.background) this.scene.background = objectSettings.background
            if (objectSettings.fog) this.scene.fog = objectSettings.fog
            if (objectSettings.overrideMaterial) this.scene.overrideMaterial = objectSettings.overrideMaterial
            if (objectSettings.autoUpdate) this.scene.autoUpdate = objectSettings.autoUpdate
            if (objectSettings.environment) this.scene.environment = objectSettings.environment
        }

        // method for setting parameters perspective camera
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

export class EventBackgroundCanvas extends Creator {
    // private eventClick: () => void;
    clickOnMonitor: () => void;
    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)
        this.width = width
        this.height = height
        this.camera = camera
        // this.events = {}
        //
        //
        // this.addEventClick=(element:THREE.Group | THREE.Mesh,callbackTrue:EventCallBack ,callbackFalse?:EventCallBack)=>{
        //
        // }


        this.clickOnMonitor=()=>{
            let selectedObject = null;

            const onDocumentMouseClick = (event: any) => {
                event.preventDefault();
                // @ts-ignore
                let intersects = getIntersects(event.layerX, event.layerY , this.camera,<THREE.Group>this.elements.elements.planeBack,this.width,this.height);
                if (intersects.length > 0) console.log(111)
            }

            let raycaster = new THREE.Raycaster();
            let mouseVector = new THREE.Vector2();

            function getIntersects(x:number, y:number , camera : Camera ,object :THREE.Group | THREE.Mesh ,width:number,height:number) {
                let Crx = (x / width) * 2 - 1;
                let Cry = -((y) / height) * 2 + 1;

                mouseVector.set(Crx, Cry);

                raycaster.setFromCamera(mouseVector,<THREE.PerspectiveCamera | THREE.OrthographicCamera>camera);

                // cube - объект проверяемый на пересечение с узлом
                return raycaster.intersectObject(object, true);
            }

            (<HTMLCanvasElement>this.canvas).addEventListener("click", onDocumentMouseClick, false);
        }

    }
}
