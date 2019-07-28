import {LOGIN_URL} from "../consts/userType"
import {get} from "./testAPI"

export async function login(uid, password) {
    if (!uid || !password) {
        return false
    }

    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', password);

    return get(LOGIN_URL, params)
}
