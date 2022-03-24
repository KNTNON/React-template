import {
  SIGN_IN,
  PROFILE,
  LOGOUT,
  SIGN_UP,
  VERIFY_TOKEN
} from "constants/action-types";
import api from "api/Api";

export const performSignIn = (email, password) => dispatch => {
  return dispatch({
    type: SIGN_IN,
    payload: api.signIn({ email, password }).then(response => {
      localStorage.setItem("token", response.token);
      return response;
    })
  });
};

export const performSignup = (email, password) => dispatch => {
  return dispatch({
    type: SIGN_UP,
    // fake
    payload: api.signUp({ email, password }).then(response => {
      localStorage.setItem("token", response.token);
      return response;
    })
  });
};

export const performLogout = () => dispatch => {
  return dispatch({
    type: LOGOUT,
    payload: api.signOut().then(response => {
      localStorage.removeItem("token");
      return response;
    })
  });
};

export const performVerifyToken = () => dispatch => {
  return dispatch({
    type: VERIFY_TOKEN,
    payload: api.verifyToken().catch(response => {
      localStorage.removeItem("token");
    })
  });
};

export const performUpdatePassword = (oldPassword, newPassword) => dispatch => {
  return dispatch({
    type: PROFILE,
    payload: api.updatePassword({ oldPassword, newPassword })
  });
};
