import actionTyper from "redux-actiontyper";

import {
  SIGN_IN,
  PROFILE,
  LOGOUT,
  SIGN_UP,
  DELETE_ACCOUNT,
  VERIFY_TOKEN
} from "constants/action-types";

const {
  SIGN_IN_PENDING,
  SIGN_IN_FULFILLED,
  SIGN_IN_REJECTED,
  PROFILE_PENDING,
  PROFILE_FULFILLED,
  PROFILE_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  SIGN_UP_PENDING,
  SIGN_UP_FULFILLED,
  SIGN_UP_REJECTED,
  DELETE_ACCOUNT_PENDING,
  DELETE_ACCOUNT_FULFILLED,
  DELETE_ACCOUNT_REJECTED,
  VERIFY_TOKEN_PENDING,
  VERIFY_TOKEN_FULFILLED,
  VERIFY_TOKEN_REJECTED
} = actionTyper();

const initialState = {
  status: "INIT",
  data:
    localStorage.getItem("token") === "" ||
    localStorage.getItem("token") === "undefined"
      ? null
      : localStorage.getItem("token"),
  error: null
};

export default (state = initialState, action) => {
  const { type, error } = action;
  switch (type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload
      });
    case SIGN_IN_PENDING:
      return Object.assign({}, state, {
        status: "Pending"
      });
    case SIGN_IN_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload,
        error: null
      });
    case SIGN_IN_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        data: null,
        error: action.payload
      });
    case PROFILE:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload
      });
    case PROFILE_PENDING:
      return Object.assign({}, state, {
        status: "Pending"
      });
    case PROFILE_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload,
        error: null
      });
    case PROFILE_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        error: action.payload
      });
    case LOGOUT:
      return Object.assign({}, state, {
        status: "Success",
        data: null
      });
    case LOGOUT_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: null,
        error: null
      });
    case SIGN_UP:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload
      });
    case SIGN_UP_PENDING:
      return Object.assign({}, state, {
        status: "Pending"
      });
    case SIGN_UP_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload,
        error: null
      });
    case SIGN_UP_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        data: null,
        error: action.payload
      });
    case DELETE_ACCOUNT:
      return Object.assign({}, state, {
        status: "Success",
        data: null,
        error: null
      });
    case DELETE_ACCOUNT_PENDING:
      return Object.assign({}, state, {
        status: "Pending"
      });
    case DELETE_ACCOUNT_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: null,
        error: null
      });
    case DELETE_ACCOUNT_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        error: action.payload
      });
    case VERIFY_TOKEN_PENDING:
      return Object.assign({}, state, {
        status: "Pending"
      });
    case VERIFY_TOKEN_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload,
        error: null
      });
    case VERIFY_TOKEN_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        data: null,
        error: action.payload
      });
    default:
      return state;
  }
};
