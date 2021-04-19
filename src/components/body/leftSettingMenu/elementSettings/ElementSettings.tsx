import React, {FunctionComponent, useMemo, useState} from 'react';


import "./elementSettings.scss"
import {useGlobalContext} from "../../../../App";

interface OwnProps {
    data: THREE.Group
}


const stepSize = 0.01
const stepPosition = 0.1
const stepRotation = 0.005


type Props = OwnProps;

const ElementSettings: FunctionComponent<Props> = (props) => {
    const context = useGlobalContext()
    const activCanvasObject = context.canvas.activeCanvas

    const canvasElement = props.data


    // delete
    function deleteElement() {
        try {
            const uuid: string = activCanvasObject.elements.groups[canvasElement.name].uuid

            delete activCanvasObject.elements.groups[canvasElement.name]

            activCanvasObject.scene.children.forEach((item: any, index: any, array: any) => {
                if (item.uuid === uuid) array.splice(index, 1)
            })
        } catch (e) {
            console.log(e)
        }
    }

    // SIZE
    const size = useMemo(() => props.data.scale.toArray(), [props.data])
    let [sizeValue, setSizeValue] = useState(1)

    function setSize(e: React.ChangeEvent<HTMLInputElement>) {
        let valueTarget = +e.target.value
        setSizeValue(() => valueTarget)

        canvasElement.scale.set(size[0] * valueTarget, size[1] * valueTarget, size[2] * valueTarget)
    }

    // POSITION
    const StartPosition = useMemo(() => props.data.position.toArray(), [props.data])
    let [positionValue, setPositionValue] = useState(StartPosition)

    function setPosition(e: React.ChangeEvent<HTMLInputElement>, kord: string) {
        let valueTarget = +e.target.value

        switch (kord) {
            case "x":
                canvasElement.position.setX(valueTarget)
                setPositionValue(p => [valueTarget, p[1], p[2]])
                return
            case "y":
                canvasElement.position.setY(valueTarget)
                setPositionValue(p => [p[0], valueTarget, p[2]])
                return
            case "z":
                canvasElement.position.setZ(valueTarget)
                setPositionValue(p => [p[0], p[1], valueTarget])
                return
            default:
                return;
        }
    }

    // ROTATION
    const startRotation = useMemo(() => props.data.rotation.toArray(), [props.data])
    let [rotationValue, setRotationValue] = useState(startRotation)

    function setRotation(e: React.ChangeEvent<HTMLInputElement>, kord: string) {
        let valueTarget = +e.target.value

        switch (kord) {
            case "x":
                canvasElement.rotation.set(valueTarget, rotationValue[1], rotationValue[2])
                setRotationValue(p => [valueTarget, p[1], p[2]])
                return
            case "y":
                canvasElement.rotation.set(valueTarget, rotationValue[1], rotationValue[2])
                setRotationValue(p => [p[0], valueTarget, p[2]])
                return
            case "z":
                canvasElement.rotation.set(valueTarget, rotationValue[1], rotationValue[2])
                setRotationValue(p => [p[0], p[1], valueTarget])
                return
            default:
                return;
        }
    }


    return (
        <div className="displayedtab-module--main-container--B-VV-">
            <h3>Size</h3>
            <div className="slider-module--slider-container--2O8f7">
                <div className="slider-module--inner--1oNQH">
                    <input type="range" min="0" max="5" step={stepSize * 10} onChange={setSize}
                           className="slider-module--slider--1oBFm" value={sizeValue}/>
                    <input type="number" className="slider-module--box--2rfF_" onChange={setSize} step={stepSize}
                           value={sizeValue}/>
                </div>
            </div>

            <div className="groupedsetting-module--container--2Xetd">
                <h3>Position</h3>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">X</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-35" max="35" onChange={(e) => setPosition(e, "x")}
                               step={stepPosition * 10} className="slider-module--slider--1oBFm"
                               value={positionValue[0]}/>
                        <input type="number" step={stepPosition} className="slider-module--box--2rfF_"
                               onChange={(e) => setPosition(e, "x")} value={positionValue[0]}/>
                    </div>
                </div>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">Y</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-35" max="35" step={stepPosition * 10}
                               className="slider-module--slider--1oBFm"
                               onChange={(e) => setPosition(e, "y")} value={positionValue[1]}/>
                        <input type="number" step={stepPosition} className="slider-module--box--2rfF_"
                               onChange={(e) => setPosition(e, "y")} value={positionValue[1]}/>
                    </div>
                </div>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">Z</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-35" max="35" step={stepPosition}
                               className="slider-module--slider--1oBFm"
                               onChange={(e) => setPosition(e, "z")} value={positionValue[2]}/>
                        <input type="number" step={stepPosition} className="slider-module--box--2rfF_"
                               onChange={(e) => setPosition(e, "z")} value={positionValue[2]}/>
                    </div>
                </div>
            </div>

            <div className="groupedsetting-module--container--2Xetd">

                <h3>Rotation</h3>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">X</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-5" max="5" step={stepRotation * 2}
                               className="slider-module--slider--1oBFm"
                               onChange={(e) => setRotation(e, "x")} value={rotationValue[0]}/>
                        <input type="number" className="slider-module--box--2rfF_" step={stepRotation}
                               onChange={(e) => setRotation(e, "x")} value={rotationValue[0]}/>
                    </div>
                </div>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">Y</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-5" max="5" step={stepRotation * 2}
                               className="slider-module--slider--1oBFm"
                               onChange={(e) => setRotation(e, "y")} value={rotationValue[1]}/>
                        <input type="number" className="slider-module--box--2rfF_" step={stepRotation}
                               onChange={(e) => setRotation(e, "y")} value={rotationValue[1]}/>
                    </div>
                </div>

                <div className="slider-module--slider-container--2O8f7">
                    <span className="slider-module--name--Bwh-H">Z</span>
                    <div className="slider-module--inner--1oNQH">
                        <input type="range" min="-5" max="5" step={stepRotation * 2}
                               className="slider-module--slider--1oBFm"
                               onChange={(e) => setRotation(e, "z")} value={rotationValue[2]}/>
                        <input type="number" className="slider-module--box--2rfF_" step={stepRotation}
                               onChange={(e) => setRotation(e, "z")} value={rotationValue[2]}/>
                    </div>
                </div>
            </div>

            <button className="deletebutton-module--button--3QWUO" style={{marginTop: "10px"}}
                    onClick={deleteElement}>Delete Element
            </button>
        </div>
    );
};

export default ElementSettings;
