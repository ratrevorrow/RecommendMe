import axios from "axios";

const BASE_URI = "https://localhost:5000";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export const client = axios.create({
    baseURL: BASE_URI,
    json: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest"
    },
});

export var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};
