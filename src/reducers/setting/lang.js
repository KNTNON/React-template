import { LANGUAGE } from "constants/action-types";
import actionTyper from "redux-actiontyper";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};
