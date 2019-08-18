import {SIGNUP_URL} from "../consts/userType"
import {post} from "./testAPI"

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

    let header = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return post(SIGNUP_URL, params, header)
}
