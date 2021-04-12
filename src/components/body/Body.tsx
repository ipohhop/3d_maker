// outer
import React, {FunctionComponent, useContext} from 'react';


// local
import "./body.scss"
import LeftSettingMenu from "./leftSettingMenu/LeftSettingMenu";
import MakerBlock from "./makerBlock/MakerBlock";
import {useGlobalContext} from "../../App";





interface OwnProps {}

type Props = OwnProps;

const Body: FunctionComponent<Props> = (props) => {

const context = useGlobalContext()


  return (
      <section className="body__container">

          <LeftSettingMenu/>
          <MakerBlock/>
      </section>
  );
};

export default Body;
