import { userConstants } from "../constants/constants";

const initialState = {
    pending: false,
    error: null,
    success: null,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { pending: true, success: null, error: null };
        case userConstants.REGISTER_SUCCESS:
            return { pending: false, success: action.registered, error: null };
        case userConstants.REGISTER_FAILURE:
            return { pending: false, success: null, error: action.error };
        default:
            return state;
    }
}
