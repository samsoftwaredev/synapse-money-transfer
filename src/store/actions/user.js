import axios from "axios";
import * as actionTypes from "./actionTypes";

export const synapseStart = () => {
  return {
    type: actionTypes.SYNAPSE_START
  };
};

export const synapseUserFound = userFound => {
  return {
    type: actionTypes.SYNAPSE_USER_FOUND,
    userFound: userFound
  };
};

export const synapseSuccess = userData => {
  return {
    type: actionTypes.SYNAPSE_SUCCESS,
    ...userData
  };
};

export const synapseFail = error => {
  return {
    type: actionTypes.SYNAPSE_FAIL,
    error: error
  };
};

export const createUserSynapse = (email, phone, name) => {
  return dispatch => {
    dispatch(synapseStart());
    let body = {
      logins: [
        {
          email: email
        }
      ],
      phone_numbers: [phone],
      legal_names: [name]
    };
    axios
      .post("/create-user", body)
      .then(response => {
        console.log(response);
        dispatch(
          synapseSuccess({
            userId: response.data.body._id,
            name: response.data.body.legal_names[0],
            phone: response.data.body.phone_numbers[0],
            refreshToken: response.data.body.refresh_token
          })
        );
      })
      .catch(error => {
        dispatch(synapseFail(error));
        console.log(error);
      });
  };
};

export const getUserSynapse = userIdSynapse => {
  return dispatch => {
    dispatch(synapseStart());
    axios
      .post("/get-user", {
        userId: userIdSynapse
      })
      .then(response => {
        console.log(response);
        dispatch(
          synapseSuccess({
            userId: response.data.body._id,
            name: response.data.body.legal_names[0],
            phone: response.data.body.phone_numbers[0],
            refreshToken: response.data.body.refresh_token
          })
        );
      })
      .catch(error => {
        dispatch(synapseFail(error));
        console.log(error);
      });
  };
};

export const searchForUserSynapse = userEmail => {
  return dispatch => {
    dispatch(synapseStart());
    axios
      .post("/all-users", {
        query: userEmail
      })
      .then(response => {
        console.log(response.data);
        dispatch(synapseUserFound(response.data));
      })
      .catch(error => {
        dispatch(synapseFail(error));
        console.log(error);
      });
  };
};
