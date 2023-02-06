import { useSelector } from "react-redux";
import { USER_LOGIN, USER_LOGOUT } from "./constants";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { user: null, token: null };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { user: action.payload.user, token: action.payload.token };
    case USER_LOGOUT:
      return { user: null, token: null };
    default:
      return state;
  }
};

export const useAuth = () => useSelector((state) => state.auth);
