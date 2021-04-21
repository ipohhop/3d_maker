import {BaseCreator} from "./root";

export class CareTaker {
    private state: any[]
    private _position: number
    private object: BaseCreator;
    private setDataInObject: (memoObject: any) => void;

    saveSnapshot: (snapshot: any) => void
    getActiveSnapshot: () => any
    undo: () => void
    redo: () => void;


    constructor(object: BaseCreator) {
        this.state = []
        this.object = object
        this._position = 0

        this.saveSnapshot = (snapshot: any) => {

            if (this.position === this.state.length-1 || 0){
                this.state.push(snapshot)
                this.position = 1
            }else {
                this.state = this.state.slice(0,this.position+1)
                this.state.push(snapshot)
                this.position = 0
            }
        }

        this.getActiveSnapshot = () => {
            return this.state[this.position]
        }

        this.undo = () => {
            // set _position
            this.position = -1

            const memoObject = this.state[this.position]

            this.setDataInObject(memoObject)
        }

        this.redo = () => {
            // set _position
            this.position = 1

            const memoObject = this.state[this.position]

            this.setDataInObject(memoObject)
        }

        this.setDataInObject = (memoObject: any) => {
            const object = this.object

            object.camera.copy(memoObject.camera, true)
            object.scene.copy(memoObject.scene, true)

            object.width = memoObject.width
            object.height = memoObject.height

            object.dragControls = memoObject.dragControls
            object.orbitControl = memoObject.orbitControl

            object.setControlStatus(memoObject.controlStatus)
        }

    }

    private get position(): number {
        return this._position
    }

    private set position(does: number) {
        switch (does) {
            case 1:
                this._position < this.state.length - 1 && (this._position = this._position + 1)
                return
            case -1:
                this._position && (this._position = this._position - 1)
                return
            case 0:
                this._position = this.state.length-1
                return
            default:
                return

        }

    }
}



