export function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));
    return token ? { 'Authorization': 'Token ' + token } : {};
}