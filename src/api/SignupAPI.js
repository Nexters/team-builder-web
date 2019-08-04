import {SIGNUP_URL} from "../consts/userType"
import {get} from "./testAPI"

export async function signup(uid, upassword, uname, uclass, ujob, accessCode) {
    if (!uid || !upassword || !uname || !uclass || !ujob || !accessCode) {
        return false
    }

    let params = new URLSearchParams();
    params.append('id', uid);
    params.append('password', upassword);
    params.append('name', uname);
    params.append('class', uclass);
    params.append('job', ujob);
    params.append('accessCode', accessCode);

    return get(SIGNUP_URL, params)

}
