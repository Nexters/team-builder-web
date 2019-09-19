import {SIGNUP_URL} from "../consts/userType"
import {POST} from '@/api/index';

export async function signup(uid, upassword, uname, nextersNumber, position, accessCode) {
    if (!uid || !upassword || !uname || !nextersNumber || !position || !accessCode) {
        return false
    }

    let params = JSON.stringify({
        'id': uid,
        'name': uname,
        'nextersNumber': nextersNumber,
        'password': upassword,
        'position': position,
        'role': "ROLE_USER"
    });

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    return POST(SIGNUP_URL, params, headers);
}
