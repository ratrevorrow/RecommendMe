import { userConstants } from "../constants/constants";

const initialState = {
    registering: false,
    error: null,
};

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true, error: null };
        case userConstants.REGISTER_SUCCESS:
            return { registering: false, error: null };
        case userConstants.REGISTER_FAILURE:
            return { registering: false, error: action.error };
        default:
            return state;
    }
}
