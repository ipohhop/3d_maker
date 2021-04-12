// local
import {Creator} from "./root";
import {Camera} from "./threejsTypes";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export class ConstructorCanvas extends Creator {
    addIphone: () => void;




    constructor(camera: Camera, width: number, height: number) {
        super(camera, width, height)

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

    }





}
