import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import "./TransferMoney.css";
import Amount from "./Amount/Amount";
import Receiver from "./Receiver/Receiver";
import Spinner from "../UI/Spinner/Spinner";

const TransferMoney = props => {
  const [userSelected, setUserSelected] = useState({});
  const userSelectedHandler = user => {
    setUserSelected(user);
  };

  const searchUserHandler = (event, userEmail) => {
    event.preventDefault();
    props.searchUser(userEmail);
  };

  const transferMoneyHandler = (event, amount) => {
    event.preventDefault();
    props.createTransaction(props.userIdSynapse, userSelected, amount);
  };
  let section =
    Object.keys(userSelected).length <= 0 ? (
      <Receiver
        userFound={props.userFound}
        searchUser={searchUserHandler}
        userSelected={userSelectedHandler}
      />
    ) : (
      <Amount
        userName={userSelected.name}
        transferMoney={transferMoneyHandler}
      />
    );
  return (
    <form className="TransferMoneyContainer">
      <h1 className="TransferMoneyTitle GlobalTitle">Transfer Money</h1>
      {props.loading ? <Spinner /> : <Fragment>{section}</Fragment>}
    </form>
  );
};
const mapStateToProps = state => {
  return {
    bankAccs: state.bank.bankAccounts,
    defaultBankAcc: state.bank.defaultBankAccount,
    loading: state.user.loading || state.bank.loading,
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
