import React, { Fragment } from "react";
import "./MenuIcon.css";
const MenuIcon = props => {
  return (
    <Fragment>
      <div onClick={props.clicked}>
        <div className="MenuIconLine" />
        <div className="MenuIconLine" />
        <div className="MenuIconLine" />
      </div>
    </Fragment>
  );
};
export default MenuIcon;
