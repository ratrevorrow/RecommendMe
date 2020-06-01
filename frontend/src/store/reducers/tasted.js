import { userConstants } from "../constants/constants";

const initialState = {
    pending: false,
    data: null, 
    error: null
};

export function getTastedBeers(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_TASTED_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case userConstants.GET_TASTED_SUCCESS:
            return {
                error: null,
                pending: false,
                data: action.response
            };
        case userConstants.GET_TASTED_FAILURE:
            return {
                data: null,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}
