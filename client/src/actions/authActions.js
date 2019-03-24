import jwt_decode from "jwt-decode";
import { apiURL } from "../axios";
import setAuthToken from "../utils/setAuthToken";

// ACTION TYPES
import {
  AUTHENTICATE_ADMIN,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER
} from "./types";

// LOGIN - Get Admin Token
export function loginAdmin(data) {
  return async dispatch => {
    try {
      const admin = await apiURL.post("/auth", data);
      // Save to localStorage
      console.log(admin.data.token);
      const { token } = admin.data;
      // Set token to ls
      localStorage.setItem("jwtToken", `bearer ${token}`);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    } catch (err) {
      const error = err.response.data;
      console.log("LOGIN ERROR", error);
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    }
  };
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Clear errors
export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}
