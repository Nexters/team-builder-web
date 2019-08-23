import {GET_ME_INFO, LOGIN_URL} from "../consts/userType";
import {post, get} from "./testAPI";
import store from '@/store/index';

export async function login(uid, password) {
    if (!uid || !password) {
        return false
    }

    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', password);

    return post(LOGIN_URL, params)
}

export async function info(token) {
    if (!token) {
        return false
    }

    let header = {
        params: {},
        headers: {
            'Authorization': token
        }
    }

    return get(GET_ME_INFO, header)
}

export function getAuthToken() {
    return store.getters.getToken;
}
