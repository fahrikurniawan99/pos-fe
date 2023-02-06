import { USER_LOGIN, USER_LOGOUT } from "./constants";

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});
export const userLogout = () => async (dispatch) => ({ type: USER_LOGOUT });
