import {ALL_USER_URL, ACTIVE_USER_URL} from "../consts/userType"
import {get} from "./testAPI";

export function getAllUsers() {
    return get(ALL_USER_URL)
}

export function getActiveUsers() {
    return get(ACTIVE_USER_URL);
}
