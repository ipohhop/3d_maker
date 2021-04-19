

// local
import {ConstructorCanvas} from "./constructorCanvas";
import React from "react";
import {creatPerspectiveCamera} from "./scene&camera";






let camera =  creatPerspectiveCamera(800, 600, 0, 0, 45.5)







export class InsertState {
 // privat
    private stateCanvas: ConstructorCanvas[]
    private activeIndex: number
    private readonly arrayLimit: number

  // out
    activeCanvas:ConstructorCanvas
    // redoActive: boolean
    // undoActive: boolean
    private setActiveCanvas: (value: (((prevState: ConstructorCanvas) => ConstructorCanvas) | ConstructorCanvas)) => void;
    count: number;
    stateFunction: (data:any) => void;


    constructor(canvas:  [ConstructorCanvas, React.Dispatch<React.SetStateAction<ConstructorCanvas>>]) {
        this.activeCanvas = canvas[0]
        this.setActiveCanvas = canvas[1]
        this.stateCanvas = []
        this.activeIndex = 0
        this.count = 1
        this.stateFunction = (data:any)=>{}

        this.addInState = this.addInState.bind(this)
        this.UndoCanvas = this.UndoCanvas.bind(this)
        this.RedoCanvas = this.RedoCanvas.bind(this)
        // this.redoActive = false
        // this.undoActive = false
        this.arrayLimit = 10
    }

    addInState() {
        // if active index is last index in state array
        if ((this.stateCanvas.length - 1) === this.activeIndex) {
            if (this.stateCanvas.length < this.arrayLimit) {
                // this.stateCanvas.push(this.activeCanvas.clone())
                this.stateCanvas.push(new ConstructorCanvas(camera, 600, 600))
                this.activeIndex = this.stateCanvas.length - 1
            } else {
                this.stateCanvas.shift()
                // this.stateCanvas.push(this.activeCanvas.clone())
                this.stateCanvas.push(new ConstructorCanvas(camera, 600, 600))
                this.activeIndex = this.stateCanvas.length - 1
            }
        }

        // if active index do not last index in state array
        else {
            // this.stateCanvas = this.stateCanvas.splice(0, this.activeIndex + 1, (this.activeCanvas as ConstructorCanvas).clone())
            this.stateCanvas = this.stateCanvas.splice(0, this.activeIndex + 1, new ConstructorCanvas(camera, 600, 600))
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

            this.activeCanvas=this.stateCanvas[this.activeIndex]
            this.count = this.count+1
            this.stateFunction(this.stateCanvas[this.activeIndex])
            // active or disable buttons
            // this.undoActive = this.activeIndex !== 0

            console.log("active canvas:",this.activeCanvas)
            console.log("canvas state:",this.stateCanvas)
            console.log("active index:",this.activeIndex)
        }
    }

    RedoCanvas() {
        console.log("Redo work")
        if (this.activeIndex < (this.stateCanvas.length-1)) {
            this.activeIndex = this.activeIndex + 1
            this.setActiveCanvas(this.stateCanvas[this.activeIndex])

            // active or disable buttons
            // this.redoActive = this.activeIndex !== this.arrayLimit-1


            // console.log("active canvas:",this.activeCanvas)
            // console.log("canvas state:",this.stateCanvas)
            // console.log("active index:",this.activeIndex)
        }
    }

}
