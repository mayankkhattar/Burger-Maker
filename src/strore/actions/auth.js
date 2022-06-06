import axios from "axios";
import * as actionTypes from "./actionTypes";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7HXoRZLaUCAQCRTe9vOolRmgwWLt7p_Q";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7HXoRZLaUCAQCRTe9vOolRmgwWLt7p_Q";
    }
    axios
      .post(url, authData)
      .then((res) => {
        // console.log(res.data);
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch((error) => {
        //console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckOut = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (!token || expirationDate < new Date()) {
      dispatch(authLogout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      const expresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
      dispatch(checkAuthTimeOut(expresIn));
    }
  };
};
