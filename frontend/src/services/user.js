import { authHeader } from "../store/helpers/auth-header";
import { urls } from "./urls";

export const userService = {
    login,
    logout,
    register,
    getAll,
    update,
    getTastedBeers,
    handleResponse
};

function login(values) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
    };

    return fetch(urls.USERS.concat("/auth_login"), requestOptions)
        .then(handleResponse)
        .then((obj) => {
            localStorage.setItem("user", JSON.stringify(obj.user));
            localStorage.setItem("token", JSON.stringify(obj.token));

            return obj.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

function getAll() {
    const requestOptions = {
        method: "GET",
    };
    return fetch(urls.BEERLIST.concat("/get_everything"), requestOptions)
        .then(handleResponse)
        .then(
            (data) => {
                console.log(data.beers);
                localStorage.setItem("alldata", JSON.stringify(data.beers));
                return data.beers;
            },
            (err) => console.log(err)
        );
}

function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    return fetch(urls.USERS.concat("/createuser"), requestOptions).then(
        handleResponse
    );
}

function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function getTastedBeers() {
    const requestOptions = {
        method: "GET",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    };

    return fetch(urls.USERS.concat("/get_tasted_beers"), requestOptions)
        .then(handleResponse)
        .then((resp) => {
            console.log(resp);
            return resp.data;
        });
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
