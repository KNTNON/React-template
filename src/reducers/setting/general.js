import { GENERAL_SETTING } from "constants/action-types";
import actionTyper from "redux-actiontyper";

const {
  GENERAL_SETTING_PENDING,
  GENERAL_SETTING_FULFILLED,
  GENERAL_SETTING_REJECTED
} = actionTyper();

const initialState = {
  status: "INIT",
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_SETTING:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload
      });
    case GENERAL_SETTING_PENDING:
      return Object.assign({}, state, {
        status: "Pending",
        data: action.payload
      });
    case GENERAL_SETTING_FULFILLED:
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload,
        error: null
      });
    case GENERAL_SETTING_REJECTED:
      return Object.assign({}, state, {
        status: "Fail",
        data: null,
        error: action.payload
      });
    default:
      return state;
  }
};
