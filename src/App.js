import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Nav from "./components/Nav/Nav";
import Dashboard from "./containers/Dashboard/Dashboard";
import Auth from "./containers/Auth/Auth";
import Bank from "./components/Bank/Bank";
import Home from "./containers/Home/Home";
import TransferMoney from "./components/TransferMoney/TransferMoney";
import Logout from "./containers/Auth/Logout/Logout";
import * as action from "./store/actions/index";
import Wrapper from "./components/UI/Wrapper/Wrapper";

const App = props => {
  useEffect(() => {
    props.authCheckState();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Nav isAuth={props.isAuth} />
        <Wrapper>
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={Home} />
          {props.isAuth ? (
            <Fragment>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/bank" exact component={Bank} />
              <Route path="/transfer-money" exact component={TransferMoney} />
              <Route path="/logout" exact component={Logout} />
            </Fragment>
          ) : null}
        </Wrapper>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(action.authCheckState())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
