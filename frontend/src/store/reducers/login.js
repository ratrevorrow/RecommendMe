import { userConstants } from "../constants/constants";

// let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    pending: false,
    user: null,
    success: false,
    error: null,
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                error: false,
                success: false,
                user: null,
                pending: true,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                error: false,
                success: true,
                user: action.user,
                pending: false,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error: action.error,
                success: false,
                user: null,
                pending: false,
            };
        case userConstants.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
