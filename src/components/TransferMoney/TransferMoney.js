import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import "./TransferMoney.css";
import Button from "../UI/Button/Button";

const TransferMoney = props => {
  const [amount, setAmount] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userSelected, setUserSelected] = useState({});
  const inputChangeHandler = (event, input) => {
    input(event.target.value);
  };
  const searchUserHandler = (event, user) => {
    event.preventDefault();
    props.searchUser(user);
  };
  const userSelectedHandler = (event, user) => {
    event.preventDefault();
    setUserSelected(user);
    console.log(user);
    setUserName(user.name);
  };
  const transferMoneyHandler = event => {
    event.preventDefault();
    props.createTransaction(props.userIdSynapse, userSelected, amount);
  };
  return (
    <form className="TransferMoneyContainer">
      <h1 className="TransferMoneyTitle GlobalTitle">Transfer Money</h1>
      <p className="TransferMoneySubtitle GlobalLabel">To:</p>
      <input
        type="text"
        placeholder="User email"
        value={userEmail}
        onChange={event => inputChangeHandler(event, setUserEmail)}
      />
      {userName}
      <Button clicked={event => searchUserHandler(event, userEmail)}>
        Search
      </Button>

      {props.userFound.map(user => {
        return (
          <p
            onClick={event => userSelectedHandler(event, user)}
            key={user.userId}
          >
            {user.name}
          </p>
        );
      })}
      <p className="TransferMoneySubtitle GlobalLabel">Enter Amount:</p>
      <input
        type="text"
        placeholder="$50.00"
        value={amount}
        onChange={event => inputChangeHandler(event, setAmount)}
      />
      <Button clicked={transferMoneyHandler}>Send Money</Button>
    </form>
  );
};
const mapStateToProps = state => {
  return {
    bankAccs: state.bank.bankAccounts,
    defaultBankAcc: state.bank.defaultBankAccount,
    userFound: state.user.userFound,
    userIdSynapse: state.user.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchUser: queryString => {
      dispatch(actions.searchForUserSynapse(queryString));
    },
    createTransaction: (userIdSynapse, accountId, amount) => {
      dispatch(actions.createTransaction(userIdSynapse, accountId, amount));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferMoney);
