import axios from "axios";
import * as actionTypes from "./actionTypes";

export const bankLoading = () => {
  return {
    type: actionTypes.BANK_LOADING
  };
};

export const setUserBankAccount = bankAccount => {
  return {
    type: actionTypes.SET_BANK_ACCOUNT,
    bankAccount: bankAccount
  };
};

export const setUserBank = bankAccounts => {
  return {
    type: actionTypes.SET_BANK_ACCOUNTS,
    bankAccounts: bankAccounts
  };
};

export const setBankList = bankList => {
  return {
    type: actionTypes.SET_BANK_LIST,
    bankList: bankList
  };
};

export const setDefaultAccount = (accountId, userId, bankData) => {
  localStorage.setItem("accountId", accountId);
  setUserBankAccount(bankData);
  axios.patch(`https://synapse-6cfd7.firebaseio.com/users/${userId}.json`, {
    accountId
  });
  return {
    type: actionTypes.SET_DEFAULT_ACCOUNT,
    defaultAccount: accountId
  };
};

export const getUserBankAccount = (accountId, userIdSynapse) => {
  return dispatch => {
    dispatch(bankLoading());
    axios
      .post("/view-account", { accountId, userId: userIdSynapse })
      .then(response => {
        console.log(response.data);
        dispatch(setUserBankAccount(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getUserBank = (
  userIdSynapse,
  username,
  password,
  bankName,
  type
) => {
  return dispatch => {
    const bankCredentials = {
      type: type || "ACH-US",
      info: {
        bank_id: username, //user's online banksing username
        bank_pw: password,
        bank_name: bankName || "fake"
      }
    };
    dispatch(bankLoading());
    axios
      .post("/bank-credentials", { bankCredentials, userId: userIdSynapse })
      .then(response => {
        console.log(response.data, response.data.nodes);
        dispatch(setUserBank(response.data.nodes));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getBankList = () => {
  return dispatch => {
    dispatch(bankLoading());
    axios
      .get("/institutions-list")
      .then(response => {
        dispatch(setBankList(response.data.banks));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createTransaction = (userIdSynapse, accountId, amount) => {
  return dispatch => {
    dispatch(bankLoading());
    axios
      .get("https://synapse-6cfd7.firebaseio.com/users.json")
      .then(response => {
        let user = Object.values(response.data).find(
          user => user.userIdSynapse === userIdSynapse
        );
        let depositAccId = user.accountId;

        return axios.post("/create-transaction", {
          userId: userIdSynapse,
          accountId: depositAccId,
          transaction: {
            to: {
              type: "ACH-US",
              id: depositAccId
            },
            amount: {
              amount: amount,
              currency: "USD"
            }
          }
        });
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
