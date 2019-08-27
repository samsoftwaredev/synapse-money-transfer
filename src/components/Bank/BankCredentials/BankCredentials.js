import React, { useState } from "react";

import "./BankCredentials.css";
import Button from "../../UI/Button/Button";

const BankCredentials = props => {
  const [username, setUsername] = useState("synapse_nomfa");
  const [password, setPassword] = useState("test1234");
  const inputChangeHandler = (event, input) => {
    input(event.target.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    props.checkCredentials(username, password);
    console.log(username, password);
  };
  let displayBank = null;
  if (Object.keys(props.userBank).length > 0) {
    displayBank = (
      <div className="BankCredentialsBankContainer">
        <div className="BankCredentialsBankImgContainer">
          <img
            className="BankCredentialsBankImg"
            src={props.userBank.horizontal_logo}
            alt={props.userBank.bank_code}
          />
        </div>
        <p className="BankCredentialsBankName">{props.userBank.bank_name}</p>
      </div>
    );
  }
  return (
    <form className="BankCredentialsContainer">
      {displayBank}
      <h1 className="BankCredentialsTitle GlobalSubtitle">Bank Credentials</h1>
      <div className="BankCredentialsInputs">
        <h3 className="BankListSubtitle GlobalLabel">Username</h3>
        <input
          type="text"
          placeholder="Your online bank username"
          value={username}
          onChange={event => inputChangeHandler(event, setUsername)}
        />
        <h3 className="BankListSubtitle GlobalLabel">Password</h3>
        <input
          type="password"
          placeholder="Your online bank password"
          value={password}
          onChange={event => inputChangeHandler(event, setPassword)}
        />
      </div>
      <Button clicked={onSubmit}>Submit</Button>
    </form>
  );
};
export default BankCredentials;
