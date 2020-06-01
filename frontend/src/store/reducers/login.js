import { userConstants } from "../constants/constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? {
          pending: false,
          user,
          loggedIn: true,
      }
    : { pending: false, user: null, loggedIn: false };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                user: null,
                loggingIn: false,
                pending: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                error: false,
                loggedIn: true,
                user: action.user,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error: action.error,
                loggedIn: false,
                user: null,
            }
        case userConstants.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null,
            }
        default:
            return state;
    }
}
