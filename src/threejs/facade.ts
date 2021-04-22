// outer
import {PerspectiveCamera} from "three";




// local
import {creatPerspectiveCamera} from "./scene&camera";

import { ConstructorCanvas } from "./constructorCanvas";
import {Creator} from "./root";
import {EventBackgroundCanvas} from "./backfroundCanvas";




export class Facade {
    private camera: (width: number, height: number, x?: number, y?: number, z?: number) => PerspectiveCamera;
    private builderFunctions: { constructor:any; back: any; base:any}







    constructor(element : HTMLCanvasElement | HTMLDivElement) {
        this.camera = creatPerspectiveCamera
        this.builderFunctions =  {
            base : Creator,
            back : EventBackgroundCanvas,
            constructor : ConstructorCanvas
        }
    }
}
