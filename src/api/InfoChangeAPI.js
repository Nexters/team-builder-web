import {ALL_USER_URL} from "../consts/userType";
import {PUT} from '@/api/index';

export function updateUserInfo(newPassword, nowPassword, position) {
    if (!newPassword || !nowPassword || !position) {
        return false
    }

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    let params = JSON.stringify({
        'newPassword': newPassword,
        'nowPassword': nowPassword,
        'position': position
    });

    return PUT(ALL_USER_URL, params, headers);
}
