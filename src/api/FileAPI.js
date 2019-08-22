import {UPLOAD_LOGO_URL} from "../consts/userType"
import {post} from "./testAPI"
import store from "../store";

export async function upload_logo(filename, images, targetPath) {
    if (!filename | !images | !targetPath) {
        return false
    }

    let formData = new FormData();
    formData.append('filename', filename);
    formData.append('images', images);
    formData.append('targetPath', targetPath);

    let header = {
        params: {},
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': store.getters.getToken
        }
    };

    return post(UPLOAD_LOGO_URL, formData, header)
}
