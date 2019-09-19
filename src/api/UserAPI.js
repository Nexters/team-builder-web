import {ALL_USER_URL, ACTIVE_USER_URL} from "../consts/userType"
import {GET, PUT} from "./index";

export function getAllUsers() {
    return GET(ALL_USER_URL)
}

export function getActiveUsers({sessionNumber}) {
    return GET(`apis/sessions/${sessionNumber}/users`);
}

export function deleteActiveUsers({sessionNumber, uuids}) {
    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return PUT(`apis/sessions/${sessionNumber}/delete-users`, params);
}

export function addActiveUsers({sessionNumber, uuids}) {
    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return PUT(`apis/sessions/${sessionNumber}/add-users`, params);
}
