import { userConstants } from "../constants/constants";
import { userService } from "../../services/user";

export const userActions = {
	login,
	logout,
	register,
	getAll,
	getTastedBeers,
};

function login(username, password) {
	return dispatch => {
		dispatch(request({ username }));

		userService.login(username, password).then(
			user => dispatch(success(user)),
			error => dispatch(failure(error))
		);
	};

	function request(user) {
		return { type: userConstants.LOGIN_REQUEST, user };
	}
	function success(user) {
		return { type: userConstants.LOGIN_SUCCESS, user };
	}
	function failure(error) {
		return { type: userConstants.LOGIN_FAILURE, error };
	}
}

function logout() {
	userService.logout();
	return { type: userConstants.LOGOUT };
}

function register(user) {
	return dispatch => {
		dispatch(request(user));

		userService.register(user).then(
			registered => dispatch(success(registered)),
			error => dispatch(failure(error))
		);
	};

	function request() {
		return { type: userConstants.REGISTER_REQUEST };
	}
	function success(registered) {
		return { type: userConstants.REGISTER_SUCCESS, registered };
	}
	function failure(error) {
		return { type: userConstants.REGISTER_FAILURE, error };
	}
}

function getAll() {
	function request() {
		return { type: userConstants.GETALL_REQUEST };
	}
	function success(alldata) {
		return { type: userConstants.GETALL_SUCCESS, alldata };
	}
	function failure(error) {
		return { type: userConstants.GETALL_FAILURE, error };
	}
	return dispatch => {
		dispatch(request());

		userService.getAll().then(
			alldata => dispatch(success(alldata)),
			error => dispatch(failure(error))
		);
	};
}

function getTastedBeers(obj) {
	return dispatch => {
		dispatch(request());

		userService.getTastedBeers(obj).then(
			response => dispatch(success(response)),
			error => dispatch(failure(error))
		);
	};

	function request() {
		return { type: userConstants.GET_TASTED_REQUEST };
	}
	function success(response) {
		return { type: userConstants.GET_TASTED_SUCCESS, response };
	}
	function failure(error) {
		return { type: userConstants.GET_TASTED_FAILURE, error };
	}
}
