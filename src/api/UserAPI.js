import {ALL_USER_URL, ACTIVE_USER_URL, DEACTIVE_USER_URL, AUTH_CODE_URL} from "../consts/userType"
import {GET, POST, PUT} from "./index";

export function getAllUsers() {
    return GET(ALL_USER_URL)
}

export function getAuthCode() {
    return GET(AUTH_CODE_URL)
}

export function updateAuthCode(authCode) {
    let params = JSON.stringify({
        'authenticationCode': authCode
    });

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    return POST(AUTH_CODE_URL, params, headers)
}

export function getActiveUsers({sessionNumber}) {
    return GET(`apis/sessions/${sessionNumber}/users`);
}

export function addActiveUsers(uuids) {
    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return PUT(ACTIVE_USER_URL, params);
}

export function deleteActiveUsers(uuids) {
    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return PUT(DEACTIVE_USER_URL, params);
}
