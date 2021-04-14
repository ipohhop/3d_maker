// outer
import React, {FunctionComponent} from 'react';
import * as THREE from 'three'

//local
import "./backgraundSettings.scss"
import {useGlobalContext} from "../../../../App";
import {InsertState} from "../../../../classConstructors";
import imgOne from "../../../public/imgs/lilienstein.jpg"

interface OwnProps {
}

type Props = OwnProps;

const BackgroundSettings: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    const insertCanvas = context.canvas as InsertState

    function eventColor(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLElement).className === "color-blocks__container") return
        const canvas = insertCanvas.activeCanvas
        const color = new THREE.Color((e.target as HTMLElement).style.background);
        canvas.settingScene({
            background: color
        })
    }

    function eventTexture(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLElement).className === "color-blocks__container") return
        const canvas = insertCanvas.activeCanvas

        const path = (e.target as HTMLElement).style.backgroundImage.split("/")[1][0]

        const texture = new THREE.TextureLoader().load(`imeg/${path}.jpg`)

        canvas.settingScene({
            background: texture
        })
    }


    return (
        <div className="background-settings__container">

            <h4> Colors </h4>

            <div className="color-blocks__container" onClick={eventColor}>
                <div style={{background: "rgba(188, 27, 104,0.5)"}}/>
                <div style={{background: "rgba(195, 141, 148,0.5)"}}/>
                <div style={{background: "rgba(197, 48, 46 ,0.5)"}}/>
                <div style={{background: "rgba(206, 106, 133 , 0.5)"}}/>
                <div style={{background: "rgba(92, 55, 76 , 0.5)"}}/>
                <div style={{background: "rgba(229, 107, 111,0.5)"}}/>
                <div style={{background: "rgba(123, 140, 222 , 0.5)"}}/>
                <div style={{background: "rgba(3, 29, 68, 0.5)"}}/>
                <div style={{background: "rgba(4, 57, 94 , 0.5)"}}/>
                <div style={{background: "rgba(55, 59, 68 , 0.5)"}}/>
                <div style={{background: "rgba(145, 234, 228 , 0.5)"}}/>
                <div style={{background: "rgba(41, 72, 255 , 0.5)"}}/>
                <div style={{background: "rgba(96, 239, 255 , 0.5)"}}/>
                <div style={{background: "rgba(48, 198, 124 , 0.5)"}}/>
                <div style={{background: "rgba(11, 56, 102 , 0.5)"}}/>
                <div style={{background: "rgba(243, 245, 32 , 0.5)"}}/>
                <div style={{background: "rgba(95, 197, 46 , 0.5)"}}/>
                <div style={{background: "rgba(9, 151, 115 , 0.5)"}}/>
                <div style={{background: "rgba(249, 188, 44 , 0.5)"}}/>
                <div style={{background: "rgba(244, 67, 105 , 0.5)"}}/>

            </div>

            <h4> Texture </h4>


            <div className="color-blocks__container" onClick={eventTexture}>

                <div style={{background: `url(${"imeg/1.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/2.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/3.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/4.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/5.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/6.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/7.jpg"})`}} className="img-background__blocks"/>
                <div style={{background: `url(${"imeg/8.jpg"})`}} className="img-background__blocks"/>

            </div>
        </div>
    );
};

export default BackgroundSettings;
