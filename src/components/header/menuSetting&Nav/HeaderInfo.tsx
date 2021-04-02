//outer
import React, { FunctionComponent } from 'react';


//local
import "./headerInfo.scss"
import RenameModule from "./renameModule/RenameModule";
import MenuNav from "./menuNav/MenuNav";


interface OwnProps {}

type Props = OwnProps;

const HeaderInfo: FunctionComponent<Props> = (props) => {

  return (
      <div className="header-info__container">
        <RenameModule/>
        <MenuNav/>
      </div>
  );
};

export default HeaderInfo;
