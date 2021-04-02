// outer
import React, { FunctionComponent } from 'react';


// local
import "./makerBlock.scss"
import CanvasContainer from "./canvas/CanvasContainer";


interface OwnProps {}

type Props = OwnProps;

const MakerBlock: FunctionComponent<Props> = (props) => {

  return (
      <div className="maker-block__container">
          <CanvasContainer/>
      </div>
  );
};

export default MakerBlock;
