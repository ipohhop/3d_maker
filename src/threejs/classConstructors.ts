// local
import {ConstructorCanvas} from "./constructorCanvas";
import React from "react";
import {creatPerspectiveCamera, creatScene} from "./scene&camera";
import {PerspectiveCamera} from "three";


function copyItem(item: any) {
    let method1 = Object.assign({}, item);
    let method2 = JSON.parse(JSON.stringify(item));


    return Object.assign({}, method1, method2)

}


let camera = creatPerspectiveCamera(800, 600, 0, 0, 45.5)

function copy(object: ConstructorCanvas) {

    const width = object.width
    const height = object.height

    const cameraInit = creatPerspectiveCamera(800, 600, 0, 0, 45.5)
    if (object.camera instanceof PerspectiveCamera) {
        cameraInit.copy(object.camera, true)
    }

    const elements = copyItem(object.elements)

    const sceneInit = creatScene()
    sceneInit.copy(object.scene, true)

    const canvas = new ConstructorCanvas(cameraInit, width, height)

    canvas.scene = sceneInit
    // canvas.elements = elements

    canvas.canvas = object.canvas

    for (const key in object.elements.groups) {
        // console.log(object.elements.groups[key])

        // console.log(copyItem(object.elements.groups[key]))
        canvas.addElement(object.elements.groups[key],key,true)
    }

    canvas.orbitControl.push(...object.orbitControl)

    return canvas
}


export class InsertState {
    // privat
    private stateCanvas: ConstructorCanvas[]
    private activeIndex: number
    private readonly arrayLimit: number

    // out
    activeCanvas: ConstructorCanvas
    // redoActive: boolean
    // undoActive: boolean
    private setActiveCanvas: (value: (((prevState: ConstructorCanvas) => ConstructorCanvas) | ConstructorCanvas)) => void;
    count: number;
    stateFunction: (data: any) => void;


    constructor(canvas: [ConstructorCanvas, React.Dispatch<React.SetStateAction<ConstructorCanvas>>]) {
        this.activeCanvas = canvas[0]
        this.setActiveCanvas = canvas[1]
        this.stateCanvas = []
        this.activeIndex = 0
        this.count = 1
        this.stateFunction = (data: any) => {}

        this.addInState = this.addInState.bind(this)
        this.UndoCanvas = this.UndoCanvas.bind(this)
        this.RedoCanvas = this.RedoCanvas.bind(this)
        // this.redoActive = false
        // this.undoActive = false
        this.arrayLimit = 10
    }

    addInState() {
        // if active index is last index in state array
        if (!this.stateCanvas.length || (this.stateCanvas.length - 1) === this.activeIndex) {
            if (this.stateCanvas.length < this.arrayLimit) {
                this.stateCanvas.push(this.activeCanvas.clone())

                // this.stateCanvas.push(copy(this.activeCanvas))

                // this.stateCanvas.push(new ConstructorCanvas(camera, 600, 600))
                this.activeIndex++
            } else {
                this.stateCanvas.shift()
                this.stateCanvas.push(this.activeCanvas.clone())

                // this.stateCanvas.push(copy(this.activeCanvas))

                // this.stateCanvas.push(new ConstructorCanvas(camera, 600, 600))
                this.activeIndex = this.stateCanvas.length - 1
            }
        }

        // if active index do not last index in state array
        else {
            this.stateCanvas = this.stateCanvas.slice(0, this.activeIndex + 1)
            this.stateCanvas.push(this.activeCanvas.clone())
            // this.stateCanvas = this.stateCanvas.splice(0, this.activeIndex + 1, new ConstructorCanvas(camera, 600, 600))
            // this.stateCanvas = this.stateCanvas.splice(0, this.activeIndex + 1, copy(this.activeCanvas))

            this.activeIndex = this.stateCanvas.length - 1
        }
    }


    UndoCanvas() {
        console.log("Undo work")

        if (this.activeIndex) {
            this.activeIndex = this.activeIndex - 1
            // @ts-ignore
            // this.setActiveCanvas(prev=>{
            //     console.log(prev)
            //     return 1})

            this.activeCanvas = this.stateCanvas[this.activeIndex]
            this.stateFunction(this.stateCanvas[this.activeIndex])
            // active or disable buttons
            // this.undoActive = this.activeIndex !== 0

            console.log("active canvas:", this.activeCanvas)
            console.log("canvas state:", this.stateCanvas)
            console.log("active index:", this.activeIndex)
        }
    }

    RedoCanvas() {
        console.log("Redo work")
        if (this.activeIndex < (this.stateCanvas.length - 1)) {
            this.activeIndex++
            this.setActiveCanvas(this.stateCanvas[this.activeIndex])
            this.activeCanvas = this.stateCanvas[this.activeIndex]
            this.stateFunction(this.stateCanvas[this.activeIndex])
            // active or disable buttons
            // this.redoActive = this.activeIndex !== this.arrayLimit-1


            console.log("active canvas:",this.activeCanvas)
            console.log("canvas state:",this.stateCanvas)
            console.log("active index:",this.activeIndex)
        }
    }

}
