import {ID_DUPLICATE_CHECK_URL, LOGIN_URL, SIGNUP_URL} from "../consts/userType"
import {POST} from '@/api/index';
import {GET} from "./index";

export async function signup(uid, upassword, uname, nextersNumber, position, email, accessCode) {
    if (!uid || !upassword || !uname || !nextersNumber || !position || !email || !accessCode) {
        return false
    }

    let params = JSON.stringify({
        'id': uid,
        'name': uname,
        'nextersNumber': nextersNumber,
        'password': upassword,
        'position': position,
        'role': "ROLE_USER",
        'email': email,
        'authenticationCode': accessCode
    });

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    return POST(SIGNUP_URL, params, headers);
}

export async function isIdDuplicate(uid) {
    if (!uid) {
        return false
    }

    return GET(ID_DUPLICATE_CHECK_URL + '?id=' + uid);
}
