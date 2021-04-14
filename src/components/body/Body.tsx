// outer
import React, {FunctionComponent} from 'react';


// local
import "./body.scss"
import LeftSettingMenu from "./leftSettingMenu/LeftSettingMenu";
import MakerBlock from "./makerBlock/MakerBlock";






interface OwnProps {}

type Props = OwnProps;

const Body: FunctionComponent<Props> = (props) => {

  return (
      <section className="body__container">

          <LeftSettingMenu/>
          <MakerBlock/>
      </section>
  );
};

export default Body;
