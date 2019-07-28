import {SIGNUP_URL} from "../consts/userType"
import {get} from "./testAPI"

export async function signup(uid, password, position, role) {
    if (!uid || !password || !position || !role) {
        return false
    }

    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', password);
    params.append('position', position);
    params.append('role', role);

    return get(SIGNUP_URL, params)

}
