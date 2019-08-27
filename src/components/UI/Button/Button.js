import React from "react";
import "./Button.css";

const button = props => {
  return (
    <button
      disabled={props.disabled}
      className="Button ButtonPrimary"
      onClick={props.clicked}
      {...props.attributes}
    >
      {props.children}
    </button>
  );
};
export default button;
