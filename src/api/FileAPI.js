import api from './index';
import {getAuthToken} from './LoginAPI';

export async function uploadFiles(filename, files, targetPath) {
    if (!filename | !files | !targetPath) {
        return false
    }

    let formData = new FormData();
    formData.append('filename', filename);
    formData.append('images', files);
    formData.append('targetPath', `${targetPath}/${Date.now()}`);

    let header = {
        params: {},
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getAuthToken()
        }
    };

    return api.post('/files/upload', formData, header)
}
