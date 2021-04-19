// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React from 'react'

// local
import {creatScene} from "./scene&camera";
import {
    Camera,
    Elements,
    Grid,
    Light,
    SceneSettings
} from "./threejsTypes";

import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {DragControls} from "three/examples/jsm/controls/DragControls";
import {PerspectiveCamera} from "three";


//  base class creator

export class BaseCreator {

    readonly elements: Elements;

    protected renderer: THREE.WebGLRenderer;
    protected controls: OrbitControls | TransformControls | DragControls | undefined;
    protected mountTime: boolean;
    protected onWindowResize: () => void;
    protected controlStatus: string;
    protected render: () => void;

    private clock: THREE.Clock;
    private readonly tick: () => void;
    private readonly startAnimation: () => void;
    private orbitControl: OrbitControls[];

    init: (container: React.MutableRefObject<any>, orbitControl?: boolean) => void;
    startWindowResize: () => void;
    stopWindowResize: () => void;
    setWidthHeight: (width: (number | undefined), height: (number | undefined)) => void;
    setControlStatus: (status: string) => void;
    clone: () => any;
    saveCanvasPng: () => void;

    scene: THREE.Scene;
    canvas: HTMLCanvasElement | undefined;
    camera: Camera;
    width: number;
    height: number;
    updatable: Set<any>;
    dragControls: DragControls [];
    capture: boolean;


    constructor(camera: Camera, width: number, height: number) {
        this.camera = camera
        this.scene = creatScene()
        this.width = width
        this.height = height
        this.mountTime = true
        this.clock = new THREE.Clock()
        this.updatable = new Set()
        this.dragControls = []
        this.orbitControl = []
        this.controlStatus = "orbit"
        this.capture = false
        this.elements = {
            groups: {},
            elements: {}
        }
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,// for withe background in scene
            antialias: true, // for save canvas in png
            preserveDrawingBuffer: true // for save canvas in png
        })


        this.setControlStatus = (status: string) => {
            if (status === "orbit") {
                this.controlStatus = status

                this.orbitControl.forEach((item) => {
                    item.enabled = true
                })

                this.dragControls.forEach((item) => {
                    item.enabled = false
                })
            }
            if (status === "drag") {
                this.controlStatus = status
                this.dragControls.forEach((item) => {
                    item.enabled = true
                })

                this.orbitControl.forEach((item) => {
                    item.enabled = false
                })
            }
        }

        this.clone = () => {

            let method1 = Object.assign({}, this);
            let method2 = JSON.parse(JSON.stringify(this));

            return Object.assign({}, method1, method2)

            // return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        }

        this.init = (container: React.MutableRefObject<any>, orbitControl: boolean = true) => {
            // enter size render window
            (this.renderer as THREE.WebGLRenderer).setSize(this.width, this.height);

            // creat canvas element
            this.canvas = (this.renderer as THREE.WebGLRenderer).domElement

            // add canvas element in DOM , "if" for don't canvas add in DOM more 1 time if useEffect call more 1 time
            container.current.innerHTML = ""
            container.current.appendChild(this.canvas) && (this.mountTime = false)

            // add orbit control to canvas
            if (!(this.camera instanceof THREE.CubeCamera) && orbitControl) this.orbitControl = [new OrbitControls(this.camera, this.canvas)];

            this.startAnimation()
        }

        this.render = () => {
            this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera)
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
            (this.renderer as THREE.WebGLRenderer).render(this.scene, this.camera as THREE.PerspectiveCamera);

            this.tick()

            window.requestAnimationFrame(this.startAnimation);
        };

        this.onWindowResize = () => {
            if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = window.innerWidth / window.innerHeight;
            if (!(camera instanceof THREE.CubeCamera)) camera.updateProjectionMatrix();
            this.width = window.innerWidth
            this.height = window.innerHeight

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        this.setWidthHeight = (width: number | undefined, height: number | undefined) => {
            if (width) this.width = width
            if (height) this.height = height;
            (this.camera as PerspectiveCamera).aspect = (width || this.width) / (height || this.height);
            (this.renderer as THREE.WebGLRenderer).setSize((width || this.width), (height || this.height))

        }

        this.saveCanvasPng = (name?: string) => {

            const dataURL = (this.canvas as HTMLCanvasElement).toDataURL("image/png", 1.0);
            window.location.href = dataURL
            const fileName = name ? name + ".png" : 'my-canvas.png'


            downloadImage(dataURL, fileName)
            // Save | Download image
            function downloadImage(data: string, filename:string) {
                let a = document.createElement('a');
                a.href = data;
                a.download = filename;
                // document.body.appendChild(a);
                a.click();
            }
        }


        this.tick = () => {
            // only call the getDelta function once per frame!
            const delta = this.clock.getDelta();

            // console.log(
            //     `The last frame rendered in ${delta * 1000} milliseconds`,
            // );

            // for (const object of Array.from(this.updatable.values())) {
            //     object.tick(delta);
            // }

            for (const object of this.updatable) {
                object.tick(delta);
            }

        }
    }
}


// class for creat full object

export class Creator extends BaseCreator {

    addLights: (lights: (Light | Light[])) => void;
    addGrid: (grid: (Grid | Grid[])) => void;
    settingScene: (objectSettings: SceneSettings) => void;
    addElement: (element: (THREE.Mesh | THREE.Mesh[] | THREE.Group),
                 name: string, drag?: boolean, inGroup?: boolean, x?: number, y?: number, z?: number) => void;

    tornPerspectiveCamera: (position?: [x: number, y: number, z: number],
                            rotation?: [x: number, y: number, z: number],
                            aspect?: number, near?: number, far?: number) => void;

    private readonly addDragControls: (element: THREE.Group) => void;


    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)
        this.width = width
        this.height = height
        this.camera = camera

        this.addDragControls = (element: THREE.Group) => {

            let controls = new DragControls(
                [element],
                this.camera as THREE.PerspectiveCamera,
                this.canvas);

            controls.transformGroup = true
            controls.addEventListener('drag', this.render);

            this.dragControls.push(controls)
            if (!(this.controlStatus === "drag")) controls.enabled = false
        }


        // method for add element in scene
        this.addElement = (element: THREE.Mesh | THREE.Mesh[] | THREE.Group, nameElement: string, drag: boolean = false,
                           inGroup: boolean = false, x: number = 0, y: number = 0, z: number = 0) => {

            // сообщение оперезаписи элемента
            if (nameElement in this.elements.groups || nameElement in this.elements.elements) console.log(`вы перезаписали элемент ${nameElement}`)

            //если element это group добавляем группу по name в объект elements.group[name] далее добавляем в сцену
            if (element instanceof THREE.Group) {
                this.elements.groups[nameElement] = element
                this.scene.add(element)
                if (drag) this.addDragControls(element)

                return
            }

            //если группа создаем объект группы и заполняем элементом(ми) добавляем группу по name в объект elements.group[name] далее добавляем в сцену
            if (inGroup) {
                const group = new THREE.Group();
                if (element instanceof Array) {
                    (group as THREE.Group).add(...element)
                }
                if (element instanceof THREE.Mesh) group.add(element)
                group.position.set(x, y, z)
                this.elements.groups[nameElement] = (group as THREE.Group)
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
                this.scene.add(element)
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
        this.tornPerspectiveCamera = (position?: [x: number, y: number, z: number], rotation?: [x: number, y: number, z: number], aspect?: number, near?: number, far?: number) => {
            if (this.camera instanceof THREE.PerspectiveCamera) {
                if (aspect) this.camera.aspect = aspect
                if (near === 0 || near) this.camera.near = near
                if (far === 0 || far) this.camera.far = far
                if (!(position === undefined)) this.camera.position.set(...position)
                if (!(rotation === undefined)) this.camera.rotation.set(...rotation)
            }
        }
    }
}
