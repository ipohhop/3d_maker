// outer
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import React, {Dispatch, SetStateAction} from 'react'


// local
import {creatScene} from "./scene&camera";
import {
    Camera, CameraPositionProps,
    Elements,
    EventItem,
    Grid,
    Light,
    SceneSettings
} from "./threejsTypes";
import gsap from 'gsap';
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import {DragControls} from "three/examples/jsm/controls/DragControls";


//  base class creator

export class BaseCreator {

    readonly elements: Elements;
    protected scene: THREE.Scene;
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

    canvas: HTMLCanvasElement | undefined;
    camera: Camera;
    width: number;
    height: number;
    updatable: Set<any>;
    dragControls: DragControls [];


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
        this.elements = {
            groups: {},
            elements: {}
        }
        this.renderer = new THREE.WebGLRenderer({
            alpha: true
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

            (this.renderer as THREE.WebGLRenderer).setSize(this.width, this.height)

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
            console.log([...Object.values(this.elements.groups)])
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

// class for back

export class EventBackgroundCanvas extends Creator {

    private gsapEvent: gsap.core.Tween | undefined;
    private events: { [eventName: string]: EventItem }
    private readonly cameraEventOnFocus: (prop: CameraPositionProps, callbackProps: Dispatch<SetStateAction<boolean>>) => void
    private cameraPositions: {
        onRoom(): { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number }; time: number }
        active: string;
        onMonitor(): { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number }; time: number }
    };
    private readonly getIntersects: (x: number, y: number, camera: Camera, object: (THREE.Group | THREE.Mesh), width: number, height: number) => THREE.Intersection[]


    clickOnMonitor: (callbackProps: React.Dispatch<React.SetStateAction<boolean>>, htmlElement: HTMLElement) => void
    clickOnRobot: () => void
    HTMLElements: { [name: string]: HTMLElement }
    addHTMLElement: (name: string, element: HTMLElement) => void

    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)
        this.width = width
        this.height = height
        this.camera = camera
        this.events = {}
        this.HTMLElements = {
            canvas: this.canvas as HTMLCanvasElement
        }
        this.cameraPositions = {
            active: "room",
            onRoom(time: number = 3) {
                this.active = "room"
                return {
                    position: {x: -1.4, y: 1.7, z: 1.5},
                    rotation: {x: 0, y: -0.5, z: 0},
                    time: time,
                    ease: "elastic"
                }
            },
            onMonitor(time: number = 3) {
                this.active = "monitor"
                return {
                    position: {x: -0.5, y: 1.72, z: 0.33},
                    rotation: {x: -0.1, y: 0.0065, z: 0.005},
                    time: time
                }
            }
        }

        this.addHTMLElement = (name: string, element: HTMLElement) => {
            this.HTMLElements[name] = element
        }
        //method for creat events

        // this.creatEventClick = (elementTarget: THREE.Group | THREE.Mesh, callback: EventCallBack, eventName: string, addEvent: boolean = true) => {
        //     let eventObject: EventItem
        //     eventObject = {
        //         eventTargets: {},
        //         addDOMElement: (element: THREE.Group | THREE.Mesh, eventTargets = eventObject.eventTargets, addEvent: boolean = true) => {
        //             eventTargets[element.name] = element
        //             if (addEvent) (<HTMLCanvasElement>this.canvas).addEventListener("click", eventObject.event, false);
        //         },
        //         _event: (event: any) => {
        //             let intersects = getIntersects(event.layerX, event.layerY, this.camera, <THREE.Group>this.elements.elements.planeBack, this.width, this.height)
        //             let object = ()=>{
        //
        //             }
        //         },
        //         addEvent: () => {
        //
        //         },
        //         removeEvent: RemoveEvent
        //     }
        //
        // }
        //

        this.clickOnMonitor = (callbackProps: Dispatch<SetStateAction<any>>, htmlElement: HTMLElement) => {
            const onDocumentMouseClick = (event: any) => {
                event.preventDefault();

                let intersects = this.getIntersects(
                    event.layerX, event.layerY, this.camera,
                    this.elements.elements.planeBack as THREE.Mesh, this.width, this.height
                )

                if (intersects.length > 0 || htmlElement.id === "outDoor") {
                    // stop camera animation if it was start
                    if (this.gsapEvent) this.gsapEvent.pause()

                    if (this.cameraPositions.active === "room") {
                        this.cameraEventOnFocus(this.cameraPositions.onMonitor(), callbackProps)
                        return
                    }
                    if (this.cameraPositions.active === "monitor") this.cameraEventOnFocus(this.cameraPositions.onRoom(), callbackProps)
                }
            }
            htmlElement.addEventListener("click", onDocumentMouseClick, false);
        }

        this.clickOnRobot = () => {

            const onDocumentMouseClick = (event: any) => {
                event.preventDefault();

                let intersects = this.getIntersects(event.layerX, event.layerY, this.camera, this.elements.groups.robot as THREE.Group, this.width, this.height);

                if (intersects.length > 0) {
                    // Create an AnimationMixer, and get the list of AnimationClip instances

                    const model = this.elements.groups.robot
                    const mixer = new THREE.AnimationMixer(model);

                    const clips = model.animations

                    // Play a specific animation (проигрываем конкретную анимацию)
                    const clip = clips[0]

                    const action = mixer.clipAction(clip);
                    action.play()

                    // @ts-ignore
                    model.tick = (delta: any) => mixer.update(delta)
                    this.updatable.add(model)
                }
            }
            (this.canvas as HTMLCanvasElement).addEventListener("click", onDocumentMouseClick, false);
        }

        this.cameraEventOnFocus = (finishPosition: CameraPositionProps, callbackProps: Dispatch<SetStateAction<boolean>>) => {

            // start positions
            let {x: PosX, y: PosY, z: PosZ} = this.camera.position
            let {x: RotX, y: RotY, z: RotZ} = this.camera.rotation

            let value = {PosX: PosX, PosY: PosY, PosZ: PosZ, RotX: RotX, RotY: RotY, RotZ: RotZ}

            const gsapAction = gsap.to(value, {
                paused: true,
                ease: finishPosition.ease,

                PosX: finishPosition.position.x,
                PosY: finishPosition.position.y,
                PosZ: finishPosition.position.z,

                RotX: finishPosition.rotation.x,
                RotY: finishPosition.rotation.y,
                RotZ: finishPosition.rotation.z,

                duration: finishPosition.time,
                onUpdate: function () {

                    // @ts-ignore
                    callbackProps(camera.position.toArray())

                    camera.position.set(value.PosX, value.PosY, value.PosZ)
                    camera.rotation.set(value.RotX, value.RotY, value.RotZ)

                },
            })

            gsapAction.play()

            this.gsapEvent = gsapAction


        }

        // function for creat raycaster object (объект пересечения с элементом)

        this.getIntersects = (x: number, y: number, camera: Camera, object: THREE.Group | THREE.Mesh, width: number, height: number) => {

            let raycaster = new THREE.Raycaster();
            let mouseVector = new THREE.Vector2();

            let Crx = (x / width) * 2 - 1;
            let Cry = -((y) / height) * 2 + 1;

            mouseVector.set(Crx, Cry);

            raycaster.setFromCamera(mouseVector, camera as THREE.PerspectiveCamera | THREE.OrthographicCamera);

            // object - объект проверяемый на пересечение с узлом
            return raycaster.intersectObject(object, true);
        }
    }
}


// function onButtonClick(event){
//
//
//
//     let spherical = new THREE.Spherical();
//     let startPos = new THREE.Vector3();
//     let endPos = new THREE.Vector3();
//     let axis = new THREE.Vector3();
//     let tri = new THREE.Triangle();
//
//
//
//     spherical.setFromVector3(camera.position);
//     spherical.phi = 0;
//     spherical.makeSafe(); // important thing, see the docs for what it does
//     endPos.setFromSpherical(spherical);
//
//     startPos.copy(camera.position);
//
//     tri.set(endPos, scene.position, startPos);
//     tri.getNormal(axis);
//
//     let angle = startPos.angleTo(endPos);
//
//     let value = {value: 0};
//     gsap.to(value, {value: 1,
//         duration: 2,
//         onUpdate: function(){
//             camera.position.copy(startPos).applyAxisAngle(axis, angle * value.value);
//             // controls.update();
//         },
//         // onStart: function(){
//         //     moveUp.disabled = true;
//         // },
//         // onComplete: function(){
//         //     moveUp.disabled = false;
//         // }
//     })
//         .play();/**/
// }
//
//


// пример анимации с TWEEN

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
