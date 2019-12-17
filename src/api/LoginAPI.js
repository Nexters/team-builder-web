import {GET_ME_INFO, LOGIN_URL} from "../consts/userType";
import {GET, POST} from '@/api/index';

export async function login(uid, password) {
    if (!uid || !password) {
        return;
    }

    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', password);

    return POST(LOGIN_URL, params);
}

export async function info(token) {
    if (!token) {
        return false;
    }

    const headers = {
        authorization: token,
    };

    return GET(GET_ME_INFO, headers);

}
