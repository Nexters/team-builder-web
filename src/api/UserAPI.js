import {ALL_USER_URL, ACTIVE_USER_URL, DEACTIVE_USER_URL, AUTH_CODE_URL, DISMISS_USER_URL} from "../consts/userType"
import {GET, POST, PUT} from "./index";
import '../utils/string'

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

export function dismissUser(userList) {
    let params = JSON.stringify({
        'uuids': userList
    });

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    return PUT(DISMISS_USER_URL, params, headers)
}

export function getActiveUsers({sessionNumber}) {
    return GET(`apis/sessions/${sessionNumber}/users`);
}

export function addActiveUser(uuid) {
    return PUT(String.format(ACTIVE_USER_URL, uuid));
}

export function deleteActiveUser(uuid) {
    return PUT(String.format(DEACTIVE_USER_URL, uuid));
}

/**
 * 활동중인 회원 리스트 (팀원추가팝업 - 검색때 사용)
 */
export function findActivatedUsers() {
    return GET('apis/activated/users');
}
