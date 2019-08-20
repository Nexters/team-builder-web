import {ALL_USER_URL, ACTIVE_USER_URL} from "../consts/userType"
import {get} from "./testAPI";
import store from "../store";

export function getAllUsers() {
    let header = {
        params: {},
        headers: {
            'Authorization': store.getters.getToken
        }
    };

    return get(ALL_USER_URL, header)
}

export function getActiveUsers() {
    return get(ACTIVE_USER_URL);
}
