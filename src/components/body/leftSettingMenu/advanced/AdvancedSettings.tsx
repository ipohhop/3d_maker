import React, {FunctionComponent} from 'react';


import "./advancedSettings.scss"
import {useGlobalContext} from "../../../../App";
import {InsertState} from "../../../../classConstructors";
interface OwnProps {
}

type Props = OwnProps;

const AdvancedSettings: FunctionComponent<Props> = (props) => {

    const context = useGlobalContext()
    let canvasObject = (context.canvas as InsertState).activeCanvas


    return (
        <div className="displayedtab-module--main-container--B-VV-">
            <div className="advancedtab-module--advanced-tab-container--1asR3"><h3>Dimensions</h3>
                <div className="advancedtab-module--dimensions-div--3G7Uj">
                    <div><span>Width:</span><input className="advancedtab-module--dimensions--1HnFq" type="number"
                                                   onChange={(event => canvasObject.setWidthHeight(+event.target.value,undefined))}
                                                   defaultValue={canvasObject.width}/></div>
                    <br/>
                    <br/>
                    <div><span>Height:</span><input className="advancedtab-module--dimensions--1HnFq" type="number"
                                                    onChange={(event => canvasObject.setWidthHeight(undefined,+event.target.value))}
                                                    defaultValue={canvasObject.height}/></div>
                </div>
            </div>
        </div>



    );
};

export default AdvancedSettings;
