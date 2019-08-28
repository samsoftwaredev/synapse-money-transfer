import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  bankAccount: {},
  bankAccounts: [],
  defaultAccount: null,
  bankList: [],
  transaction: {},
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BANK_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.BANK_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.SET_BANK_ACCOUNT:
      return updateObject(state, {
        bankAccount: action.bankAccount,
        loading: false
      });
    case actionTypes.SET_BANK_ACCOUNTS:
      return updateObject(state, {
        bankAccounts: action.bankAccounts,
        loading: false
      });
    case actionTypes.SET_BANK_LIST:
      return updateObject(state, { bankList: action.bankList, loading: false });
    case actionTypes.SUCCESS_TRANSACTION:
      return updateObject(state, {
        transaction: action.transaction,
        loading: false
      });
    case actionTypes.SET_DEFAULT_ACCOUNT:
      return updateObject(state, {
        defaultAccount: action.defaultAccount,
        loading: false
      });
    default:
      return state;
  }
};

export default reducer;
