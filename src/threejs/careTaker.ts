import {BaseCreator} from "./root";
import {creatPerspectiveCamera, creatScene} from "./scene&camera";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Group} from "three";

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

            if (this.position === this.state.length - 1 || 0) {
                this.state.push(snapshot)
                this.position = 1
            } else {
                this.state = this.state.slice(0, this.position + 1)
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

            object.camera = creatPerspectiveCamera(800, 600, 0, 0, 45.5).copy(memoObject.camera, true)
            object.scene = creatScene().copy(memoObject.scene, true)

            object.width = memoObject.width
            object.height = memoObject.height

            object.scene.children.forEach(item=> {

                if (item.type === "Group") object.addDragControls(item as Group)
                    // if (item.type === "Group") (object.elements.groups[item.name] = item as Group)

            })

            object.elements.groups = memoObject.elements


            object.setControlStatus(memoObject.controlStatus)

            object.dragControls = memoObject.dragControls
            object.dragControls.forEach(item => {
                item.addEventListener('drag', object.render);
                if (!(object.controlStatus === "drag")) item.enabled = false
            })


            const orbitControl = new OrbitControls(object.camera, object.canvas)
            orbitControl.enabled = memoObject.controlStatus === "orbit"
            object.orbitControl = [orbitControl]


            console.log(object)

            console.log(object.dragControls[0].getObjects())

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
                this._position = this.state.length - 1
                return
            default:
                return

        }

    }
}



