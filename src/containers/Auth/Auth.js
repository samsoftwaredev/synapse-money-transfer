import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

import "./Auth.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
const Auth = props => {
  const field = { value: "", valid: false };
  const [form, setForm] = useState({
    email: { ...field, isEmail: true, primary: true },
    password: { ...field, isPassword: true, primary: true },
    name: { ...field, isName: true },
    phone: { ...field, isPhone: true }
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const isValidHandler = (field, value) => {
    if (field.isEmail) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    if (field.isName) {
      return /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/.test(value);
    }
    if (field.isPhone) {
      return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
    }
    return true;
  };
  const inputChangedHandler = (event, field) => {
    console.log(event.target.value, field);
    let valid = isValidHandler(field, event.target.value);
    let fieldCopy = field;
    fieldCopy.value = event.target.value;
    fieldCopy.valid = valid;
    setForm({
      ...form,
      fieldCopy: { ...fieldCopy }
    });
  };
  const errorMsgHandler = input => {
    console.log(input);
    if (!input) return false;
    if (input.isEmail) setErrorMsg("Invalid email address");
    if (input.isName) setErrorMsg("Invalid legal name");
    if (input.isPhone) setErrorMsg("Invalid phone number");
    if (input.isPassword) setErrorMsg("Invalid password");
    return true;
  };
  const authUserHandler = event => {
    event.preventDefault();
    setErrorMsg("");
    let formArr = Object.values({ ...form });
    let error = errorMsgHandler(
      formArr.find(field => field.primary && !field.valid)
    );
    if (isSignUp) {
      error = errorMsgHandler(formArr.find(field => !field.valid));
      if (!error)
        props.signUp(
          form.email.value,
          form.password.value,
          form.phone.value,
          form.name.value
        );
    } else {
      if (!error) props.logIn(form.email.value, form.password.value);
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
  if (props.error || errorMsg) {
    errorMessage = <p className="AuthMessage">{props.error || errorMsg}</p>;
  }
  let display = isSignUp ? (
    <Fragment>
      <input
        type="text"
        placeholder="Full legal name"
        value={form.name.value}
        onChange={event => inputChangedHandler(event, form.name)}
      />
      <input
        type="text"
        placeholder="Phone number"
        value={form.phone.value}
        onChange={event => inputChangedHandler(event, form.phone)}
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
              value={form.email.value}
              onChange={event => inputChangedHandler(event, form.email)}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password.value}
              onChange={event => inputChangedHandler(event, form.password)}
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
