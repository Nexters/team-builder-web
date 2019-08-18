import store from '../store/index';
import {put} from "./testAPI"

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

    return put('/apis/users', params, header);
}
