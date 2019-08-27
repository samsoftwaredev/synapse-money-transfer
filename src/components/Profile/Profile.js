import React, { Fragment } from "react";
import { connect } from "react-redux";

import "./Profile.css";
import Spinner from "../UI/Spinner/Spinner";
const Profile = props => {
  return (
    <form className="ProfileContainer">
      <h1 className="GlobalTitle ProfileTitle">Profile</h1>
      {props.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <span className="GlobalLabel ProjectLabel">Name: </span>
            <span className="GlobalLabel">{props.name}</span>
          </div>
          <div>
            <span className="GlobalLabel ProjectLabel">Phone: </span>
            <span className="GlobalLabel">{props.phone}</span>
          </div>
          <div>
            <span className="GlobalLabel ProjectLabel">Email: </span>
            <span className="GlobalLabel">{props.email}</span>
          </div>
        </Fragment>
      )}
    </form>
  );
};
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    name: state.user.name,
    phone: state.user.phone,
    userIdSynapse: state.auth.userId,
    loading: state.user.loading || state.auth.loading
  };
};

export default connect(mapStateToProps)(Profile);
