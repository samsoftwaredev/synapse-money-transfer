import React from "react";

import "./Toolbar.css";
import NavItems from "../NavItems/NavItems";
const Toolbar = props => {
  return (
    <div className="ToolbarContainer">
      <NavItems isAuth={props.isAuth} />
    </div>
  );
};
export default Toolbar;
