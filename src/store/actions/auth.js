import axios from "axios";
import * as actionTypes from "./actionTypes";
import { errorCodeToMsg } from "../errorCodeToMsg";

const setStorage = (idToken, expiresIn, userId) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem("token", idToken);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("userId", userId);
};

const removeStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userIdSynapse");
  localStorage.removeItem("accountId");
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = resData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    ...resData
  };
};

export const authSynapseSuccess = userData => {
  return {
    type: actionTypes.SYNAPSE_SUCCESS,
    ...userData
  };
};

export const authSynapseStart = userData => {
  return {
    type: actionTypes.SYNAPSE_START,
    ...userData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  removeStorage();
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const signUp = (email, password, phone, name) => {
  return dispatch => {
    dispatch(authStart());
    let key = "AIzaSyCYyRFkfxapbMMhtaYQ7WMSaUa_49CCvRY";
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const userData = {
      logins: [
        {
          email: email
        }
      ],
      phone_numbers: [phone],
      legal_names: [name]
    };

    let signUp = async () => {
      try {
        const userAuth = await axios.post(authUrl, authData);

        console.log("auth: ", userAuth);
        dispatch(
          authSuccess({
            idToken: userAuth.data.idToken,
            userId: userAuth.data.localId,
            email: userAuth.data.email
          })
        );

        dispatch(checkAuthTimeout(userAuth.data.expiresIn));
        setStorage(
          userAuth.data.idToken,
          userAuth.data.expiresIn,
          userAuth.data.localId
        );
        dispatch(authSynapseStart());
        const response = await axios.post("/create-user", userData);

        localStorage.setItem("userIdSynapse", response.data.body._id);
        dispatch(
          authSynapseSuccess({
            userId: response.data.body._id,
            name: response.data.body.legal_names[0],
            phone: response.data.body.phone_numbers[0],
            refreshToken: response.data.body.refresh_token
          })
        );
        const storeId = await axios.patch(
          `https://synapse-6cfd7.firebaseio.com/users/${userAuth.data.localId}.json`,
          {
            userIdSynapse: response.data.body._id
          },
          {
            headers: {
              access_token: userAuth.data.idToken
            }
          }
        );

        console.log("id uploaded ", storeId);
      } catch (error) {
        console.log(error);
        dispatch(authFail(errorCodeToMsg(error.response.data.error.message)));
      }
    };
    signUp();
  };
};

export const logIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    let key = "AIzaSyCYyRFkfxapbMMhtaYQ7WMSaUa_49CCvRY";
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(authUrl, authData)
      .then(response => {
        console.log(response);
        dispatch(
          authSuccess({
            idToken: response.data.idToken,
            userId: response.data.localId,
            email: response.data.email
          })
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
        setStorage(
          response.data.idToken,
          response.data.expiresIn,
          response.data.localId
        );

        return axios.get(
          `https://synapse-6cfd7.firebaseio.com/users/${response.data.localId}.json`
        );
      })
      .then(response => {
        console.log("LogIn", response);
        localStorage.setItem("userIdSynapse", response.data.userIdSynapse);
        localStorage.setItem("accountId", response.data.accountId);
        dispatch(authSynapseStart());
        return axios.post("/get-user", {
          userId: response.data.userIdSynapse
        });
      })
      .then(response => {
        dispatch(
          authSynapseSuccess({
            userId: response.data.body._id,
            name: response.data.body.legal_names[0],
            phone: response.data.body.phone_numbers[0],
            refreshToken: response.data.body.refresh_token
          })
        );
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(errorCodeToMsg(error.response.data.error.message)));
      });
  };
};

const reAuth = (dispatch, token, userIdSynapse, expirationDate) => {
  let key = "AIzaSyCYyRFkfxapbMMhtaYQ7WMSaUa_49CCvRY";

  dispatch(
    checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
  );

  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
      { idToken: token }
    )
    .then(response => {
      dispatch(
        authSuccess({
          idToken: response.data.users[0].idToken,
          userId: response.data.users[0].localId,
          email: response.data.users[0].email
        })
      );
      return axios.get(
        `https://synapse-6cfd7.firebaseio.com/users/${response.data.users[0].localId}.json`
      );
    })
    .then(response => {
      localStorage.setItem("userIdSynapse", response.data.userIdSynapse);
      localStorage.setItem("accountId", response.data.accountId);
      dispatch(authSynapseStart());
      return axios.post("/get-user", {
        userId: userIdSynapse
      });
    })
    .then(response => {
      dispatch(
        authSynapseSuccess({
          userId: response.data.body._id,
          name: response.data.body.legal_names[0],
          phone: response.data.body.phone_numbers[0],
          refreshToken: response.data.body.refresh_token
        })
      );
    })
    .catch(error => {
      console.log(error);
    });
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userIdSynapse = localStorage.getItem("userIdSynapse");
        reAuth(dispatch, token, userIdSynapse, expirationDate);
      }
    }
  };
};
