import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userId: null,
  name: null,
  phone: null,
  refreshToken: null,
  userFound: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SYNAPSE_START:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.SYNAPSE_SUCCESS:
      return updateObject(state, {
        ...action,
        loading: false,
        error: null
      });
    case actionTypes.SYNAPSE_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.SYNAPSE_USER_FOUND:
      return updateObject(state, {
        userFound: action.userFound,
        loading: false,
        error: null
      });
    default:
      return state;
  }
};

export default reducer;
