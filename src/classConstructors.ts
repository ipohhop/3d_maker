

// local
import {ConstructorCanvas} from "./threejs/constructorCanvas";


export class InsertState {
 // privat
    private stateCanvas: ConstructorCanvas[]
    private activeIndex: number
    private arrayLimit: number

  // out
    activeCanvas: ConstructorCanvas
    redoActive: boolean;
    undoActive: boolean;


    constructor(canvas: ConstructorCanvas ) {
        this.activeCanvas = canvas
        this.stateCanvas = [this.activeCanvas]
        this.activeIndex = 0
        this.addInState = this.addInState.bind(this)
        this.UndoCanvas = this.UndoCanvas.bind(this)
        this.RedoCanvas = this.RedoCanvas.bind(this)
        this.redoActive = false
        this.undoActive = false
        this.arrayLimit = 10
    }

    addInState() {
        // if active index is last index in state array
        if ((this.stateCanvas.length - 1) === this.activeIndex) {
            if (this.stateCanvas.length < this.arrayLimit) {
                this.stateCanvas.push(this.activeCanvas.clone())
                this.activeIndex = this.stateCanvas.length - 1
            } else {
                this.stateCanvas.shift()
                this.stateCanvas.push(this.activeCanvas.clone())
                this.activeIndex = this.stateCanvas.length - 1
            }
        }
        // if active index do not last index in state array
        else {
            this.stateCanvas = this.stateCanvas.splice(0, this.activeIndex + 1, (this.activeCanvas as ConstructorCanvas).clone())
            this.activeIndex = this.stateCanvas.length - 1
        }
    }

    UndoCanvas() {
        if (this.activeIndex) {
            this.activeIndex = this.activeIndex - 1
            this.activeCanvas = this.stateCanvas[this.activeIndex]

            // active or disable buttons
            this.undoActive = this.activeIndex !== 0
        }
    }

    RedoCanvas() {
        if (this.activeIndex < (this.stateCanvas.length-1)) {
            this.activeIndex = this.activeIndex + 1
            this.activeCanvas = this.stateCanvas[this.activeIndex]

            // active or disable buttons
            this.redoActive = this.activeIndex !== this.arrayLimit-1
        }
    }

}
