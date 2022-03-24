import {
  GENERAL_SETTING,
  DELETE_ACCOUNT,
  LANGUAGE
} from "constants/action-types";
import api from "api/Api";

export const performSaveGeneralSetting = (
  userId,
  language,
  privacy
) => dispatch => {
  return dispatch({
    type: GENERAL_SETTING,
    payload: api.userUpdate(userId, { language, privacy })
  });
};

export const performDeleteAccount = () => dispatch => {
  return dispatch({
    type: DELETE_ACCOUNT,
    payload: api.deleteAccount().then(response => {
      localStorage.removeItem("token");
      return response;
    })
  });
};

export const performChangeLanguage = language => dispatch => {
  return dispatch({
    type: LANGUAGE,
    payload: language
  });
};
