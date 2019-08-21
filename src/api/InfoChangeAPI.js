import store from '../store/index';
import {put} from "./testAPI"
import {ALL_USER_URL} from "../consts/userType";

export function updateUserInfo(newPassword, nowPassword, position) {
    if (!newPassword || !nowPassword || !position) {
        return false
    }

    let params = JSON.stringify({
        'newPassword': newPassword,
        'nowPassword': nowPassword,
        'position': position
    });

    let header = {
        headers: {
            'Authorization': store.getters.getToken,
            'Content-Type': 'application/json'
        }
    };

    return put(ALL_USER_URL, params, header);
}
