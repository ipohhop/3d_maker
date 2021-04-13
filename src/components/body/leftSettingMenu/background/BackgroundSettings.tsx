import React, {FunctionComponent} from 'react';

interface OwnProps {
}

type Props = OwnProps;

const BackgroundSettings: FunctionComponent<Props> = (props) => {

    return (
        <div className="background-settings__container">
            <div className="advancedtab-module--advanced-tab-container--1asR3"><h3>Dimensions</h3>
                <div className="advancedtab-module--dimensions-div--3G7Uj">
                    <div><span>Width:</span><input className="advancedtab-module--dimensions--1HnFq" type="number"
                                                   defaultValue="380"/></div>
                    <span>X</span>
                    <div><span>Height:</span><input className="advancedtab-module--dimensions--1HnFq" type="number"
                                                    defaultValue="346"/></div>
                </div>
            </div>
        </div>


    );
};

export default BackgroundSettings;
