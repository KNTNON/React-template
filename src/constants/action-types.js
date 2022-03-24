import actionTyper from "redux-actiontyper";

/**
 * Authentication
 */
export const {
  SIGN_IN,
  SIGN_OUT,
  PROFILE,
  LOGOUT,
  SIGN_UP,
  VERIFY_TOKEN
} = actionTyper();

/**
 *  Setting
 */
export const {
  GENERAL_SETTING,
  SETTING,
  DELETE_ACCOUNT,
  LANGUAGE
} = actionTyper();

/**
 * Request
 */
export const { REQUEST_FAIL } = actionTyper();
