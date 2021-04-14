// local
import {Creator} from "./root";
import {Camera} from "./threejsTypes";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import * as THREE from "three";
import {DragControls} from "three/examples/jsm/controls/DragControls";
import {log} from "util";


export class ConstructorCanvas extends Creator {
    addIphone: () => void;
    addIpad: () => void;
    addMac: () => void;
    private canvasEvent: () => void;
    playControl: (value: boolean) => void;
    addTransformControls: () => void;




    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)

        this.addTransformControls=()=>{
            this.controls = new TransformControls(this.camera as THREE.PerspectiveCamera, this.canvas);
        }


        this.playControl=(value:boolean)=>{
            if (this.controls) this.controls.enabled=value
        }

        this.canvasEvent = ()=>{
            (this.canvas as HTMLCanvasElement).addEventListener("click",()=>{
                console.log(" click click to canvas")})
        }

        this.addIphone=()=> {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/iphone11/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.05, 0.05, 0.05)
                let name = `iphone#${Math.random()}`
                element.name = name

                element.position.set(Math.random()*10,Math.random()*10,Math.random()*10)

                canvas.addElement(element,name)

            })
        }

        this.addIpad=()=> {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/ipad/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.4, 0.4, 0.4)
                let name = `ipad#${Math.random()}`
                element.name = name

                element.position.set(Math.random()*10,Math.random()*10,Math.random()*10)

                canvas.addElement(element,name)

            })
        }

        this.addMac=()=> {
            const loader = new GLTFLoader()
            const pathIphone = 'models/apple/macbook/scene.gltf'
            const canvas = this
            loader.load(pathIphone, function (gltf) {
                const element = gltf.scene
                element.scale.set(0.7, 0.7, 0.7)
                let name = `mac#${Math.random()}`
                element.name = name

                element.position.set(Math.random()*10,Math.random()*10,Math.random()*10)

                canvas.addElement(element,name)

            })
        }

    }





}
