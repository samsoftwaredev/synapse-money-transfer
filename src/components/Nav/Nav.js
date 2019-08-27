import React from "react";

import "./Nav.css";
import Sidebar from "./Sidebar/Sidebar";
import Toolbar from "./Toolbar/Toolbar";

const Nav = props => {
  return (
    <div className="Nav">
      {/* <Sidebar /> */}
      <Toolbar isAuth={props.isAuth} />
    </div>
  );
};

export default Nav;
