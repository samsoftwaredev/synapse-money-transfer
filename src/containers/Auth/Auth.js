import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

import "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
const Auth = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const inputChangedHandler = (event, input) => {
    input(event.target.value);
  };
  const authUserHandler = event => {
    event.preventDefault();
    if (isSignUp) {
      props.signUp(email, password, phone, name);
    } else {
      props.logIn(email, password);
    }
  };
  const switchHandler = () => {
    setIsSignUp(!isSignUp);
  };

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to="/dashboard" />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className="AuthMessage">{props.error}</p>;
  }
  let display = isSignUp ? (
    <Fragment>
      <input
        type="text"
        placeholder="Full legal name"
        value={name}
        onChange={event => inputChangedHandler(event, setName)}
      />
      <input
        type="text"
        placeholder="Phone number"
        value={phone}
        onChange={event => inputChangedHandler(event, setPhone)}
      />
      <div>
        <Button clicked={event => authUserHandler(event)}>Sing Up</Button>
        <p className="GlobalLabel">
          Do you have an account?
          <span className="AuthSwitch" onClick={switchHandler}>
            Log In
          </span>
        </p>
      </div>
    </Fragment>
  ) : (
    <div>
      <Button clicked={event => authUserHandler(event)}>Log In</Button>

      <p className="GlobalLabel">
        Don't have an account?
        <span className="AuthSwitch" onClick={switchHandler}>
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <form className="AuthContainer">
      <h1 className="GlobalTitle">Register</h1>
      {authRedirect}
      {props.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {errorMessage}
          <Fragment>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={event => inputChangedHandler(event, setEmail)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => inputChangedHandler(event, setPassword)}
            />
          </Fragment>
          {display}
        </Fragment>
      )}
    </form>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: (email, password) => {
      return dispatch(actions.logIn(email, password));
    },
    signUp: (email, password, phone, name) => {
      return dispatch(actions.signUp(email, password, phone, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
