import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import "./Profile.css";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
const Profile = props => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(props.name || "");
    setPhone(props.phone || "");
    setEmail(props.email || "");
  }, [props]);

  const inputChangeHandler = (event, input) => {
    input(event.target.value);
  };

  const updateUserHandler = event => {
    event.preventDefault();
    props.updateUser(email, phone, name);
  };

  return (
    <form className="ProfileContainer">
      <h1 className="GlobalTitle ProfileTitle">Profile</h1>
      {props.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <input
            type="text"
            placeholder="Legal name"
            value={name}
            onChange={event => inputChangeHandler(event, setName)}
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={event => inputChangeHandler(event, setPhone)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => inputChangeHandler(event, setEmail)}
          />
        </Fragment>
      )}
      <Button clicked={updateUserHandler}>Update Profile</Button>
    </form>
  );
};
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    name: state.user.name,
    phone: state.user.phone,
    loading: state.user.loading || state.auth.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userIdSynapse, email, phone, name) => {
      dispatch(actions.updateUser(userIdSynapse, email, phone, name));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
