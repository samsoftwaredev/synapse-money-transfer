import React, { Fragment, useState } from "react";

import "./Receiver.css";
import Button from "../../UI/Button/Button";

const Receiver = props => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const inputChangeHandler = event => {
    setUserEmail(event.target.value);
  };
  const userClickedHandler = user => {
    setUserName(user.name);
    props.userSelected(user);
  };
  return (
    <Fragment>
      <p className="TransferMoneySubtitle GlobalLabel">To</p>
      <input
        type="text"
        placeholder="User email"
        value={userEmail}
        onChange={event => inputChangeHandler(event)}
      />
      {userName}
      <Button clicked={event => props.searchUser(event, userEmail)}>
        Search
      </Button>
      <ul className="ReceiverNamesContainer">
        {Object.keys(props.userFound).length ? (
          <h3 className="GlobalLabel">Select user</h3>
        ) : null}
        {props.userFound.map(user => {
          return (
            <li
              className="ReceiverNames"
              onClick={() => userClickedHandler(user)}
              key={user.userId}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};
export default Receiver;
