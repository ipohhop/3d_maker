// outer
import React, {FunctionComponent} from 'react';


// local
import "./makerBlock.scss"
import CanvasContainer from "./canvas/CanvasContainer";
import {useGlobalContext} from "../../../App";


interface OwnProps {
}

type Props = OwnProps;

const MakerBlock: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    const canvasObject = context.canvas.activeCanvas

    function onOrbitControl(e:React.MouseEvent<HTMLDivElement>) {

    }

    return (
        <div className="maker-block__container">
            <CanvasContainer/>
            <div className="module-control__container">

                <div className="module-control__item controls-module__active ">

                    <svg  viewBox="0 -87 432 432" className="controls-module--active--1G4Rl">
                        <path
                            d="m278.90625 0h-248.90625c-16.5625.0195312-29.9804688 13.4375-30 30v197.421875c.0195312 16.5625
                    13.4375 29.980469 30 30h248.90625c16.558594-.019531 29.980469-13.4375 30-30v-197.421875c-.019531-16.5625-13.441406-29.9804688-30-30zm0 0">
                        </path>
                        <path d="m328.90625 169.800781 103.09375 56.285157v-194.105469l-103.09375 56.285156zm0 0"></path>
                    </svg>

                </div>

                <div className="module-control__item  controls-module__active">

                    <svg id="Capa_1"  viewBox="0 0 512 512" >
                        <g>
                            <path d="m256.002 242.913 210.412-121.43-210.412-121.483-210.416 121.483z"></path>
                            <path d="m240.949 268.986-210.415-121.429v242.96l210.415 121.483z"></path>
                            <path d="m271.056 268.986v243.014l210.41-121.483v-242.96z"></path>
                        </g>
                    </svg>

                </div>


            </div>


        </div>
    );
};

export default MakerBlock;
