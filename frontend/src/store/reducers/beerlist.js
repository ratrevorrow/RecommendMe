import { userConstants } from "../constants/constants";

// let alldata = JSON.parse(localStorage.getItem("alldata"));
const initialState = {
    pending: true,
    alldata: null, // alldata ? alldata : null, // null
    error: null,
};

export function beerlist(state = initialState, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                alldata: null
            };
        case userConstants.GETALL_SUCCESS:
            return {
                ...state,
                pending: false,
                alldata: action.alldata,
            };
        case userConstants.GETALL_FAILURE:
            return {
                pending: false,
                alldata: {},
                error: action.error
            };
        default:
            return state;
    }
}
