import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import "./Bank.css";
import AccountInformation from "./AccountInformation/AccountInformation";
import BankAccounts from "./BankAccounts/BankAccounts";
import BankCredentials from "./BankCredentials/BankCredentials";
import BankList from "./BankList/BankList";
import Spinner from "../UI/Spinner/Spinner";
import Button from "../UI/Button/Button";

const Bank = props => {
  const [userBank, setUserBank] = useState({});
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (props.bankList.length <= 0) props.getBankList();
  }, []);

  const checkCredentialsHandler = (username, password) => {
    props.getUserBank(
      props.userIdSynapse,
      username,
      password,
      userBank.bank_name
    );
    nextStepHandler();
  };

  const accountSelectedHandler = acc => {
    props.setDefaultAccount(acc._id, props.userId, acc);
    props.getUserBankAccount(acc._id, props.userIdSynapse);
    nextStepHandler();
  };

  const navigateHandler = () => {
    props.history.push("/transfer-money");
  };

  const nextStepHandler = () => {
    let currentStep = step + 1;
    setStep(currentStep);
  };

  const bankSelectedHandler = bank => {
    console.log(Object.keys(bank));
    if (Object.keys(bank).length > 0) {
      nextStepHandler();
    }
    setUserBank(bank);
  };

  let section = null;
  switch (step) {
    case 0:
      section = (
        <BankList
          bankSelected={bank => bankSelectedHandler(bank)}
          bankList={props.bankList}
        />
      );
      break;
    case 1:
      section = (
        <BankCredentials
          userBank={userBank}
          checkCredentials={checkCredentialsHandler}
        />
      );
      break;
    case 2:
      section = (
        <BankAccounts
          accountSelected={accountSelectedHandler}
          bankAccs={props.bankAccs}
        />
      );
      break;
    case 3:
      section = (
        <Fragment>
          <p className="GlobalSubtitle">Your default account:</p>
          <AccountInformation accInfo={props.bankAcc} />
          <Button clicked={navigateHandler}>Start Sending Money</Button>
        </Fragment>
      );
      break;
    default:
      section = (
        <Fragment>
          <p className="GlobalSubtitle">You already selected an account</p>
          <Button clicked={navigateHandler}>Start Sending Money</Button>
        </Fragment>
      );
  }

  return (
    <div className="BankContainer">
      <h1 className="BankTitle GlobalTitle">Bank</h1>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="BankComponents">{section}</div>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    bankAcc: state.bank.bankAccount,
    bankAccs: state.bank.bankAccounts,
    bankList: state.bank.bankList,
    userIdSynapse: state.user.userId,
    userId: state.auth.userId,
    loading: state.bank.loading,
    defaultAcc: state.bank.defaultAccount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBankList: () => {
      dispatch(actions.getBankList());
    },
    getUserBankAccount: (accountId, userIdSynapse) => {
      dispatch(actions.getUserBankAccount(accountId, userIdSynapse));
    },
    getUserBank: (userIdSynapse, username, password, bankName) => {
      dispatch(
        actions.getUserBank(userIdSynapse, username, password, bankName)
      );
    },
    setDefaultAccount: (accountId, userId, acc) => {
      dispatch(actions.setDefaultAccount(accountId, userId, acc));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
