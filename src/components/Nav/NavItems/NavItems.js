import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./NavItems.css";
import Logo from "../../Logo/Logo";
const NavItems = props => {
  return (
    <div className="NavItemsContainer">
      <NavLink className="NavItemsLogo" to="/">
        <Logo />
      </NavLink>
      <div className="NavItemsList">
        {!props.isAuth ? (
          <NavLink className="NavItemsItem" to="/auth">
            Register
          </NavLink>
        ) : (
          <Fragment>
            <NavLink className="NavItemsItem" to="/bank">
              Bank
            </NavLink>
            <NavLink className="NavItemsItem" to="/transfer-money">
              Transfer Money
            </NavLink>
            <NavLink className="NavItemsItem" to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="NavItemsItem" to="/logout">
              Logout
            </NavLink>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default NavItems;
