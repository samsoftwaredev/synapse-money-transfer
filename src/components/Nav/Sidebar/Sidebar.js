import React from "react";

import "./Sidebar.css";
import NavItems from "../NavItems/NavItems";
const Sidebar = props => {
  return (
    <div>
      <NavItems isAuth={props.isAuth} />
    </div>
  );
};
export default Sidebar;
