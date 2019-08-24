import {ALL_USER_URL, ACTIVE_USER_URL} from "../consts/userType"
import {get} from "./testAPI";
import api from "./index";
import store from '../store/index';

export function getAllUsers() {
    let header = {
        params: {},
        headers: {
            'Authorization': store.getters.getToken
        }
    };

    return get(ALL_USER_URL, header)
}

export function getActiveUsers({sessionNumber}) {
    const token = store.getters.getToken;
    Object.assign(api.defaults, {headers: {authorization: token}});

    return api.get(`apis/sessions/${sessionNumber}/users`);
}

export function deleteActiveUsers({sessionNumber, uuids}) {
    const token = store.getters.getToken;
    Object.assign(api.defaults, {headers: {authorization: token}});

    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return api.put(`apis/sessions/${sessionNumber}/delete-users`, params);
}

export function addActiveUsers({sessionNumber, uuids}) {
    const token = store.getters.getToken;
    Object.assign(api.defaults, {headers: {authorization: token}});

    let params = new URLSearchParams();
    params.append('uuids', uuids);

    return api.put(`apis/sessions/${sessionNumber}/add-users`, params);
}
