import {POST} from './index';

export async function uploadFiles(filename, files, targetPath) {
    if (!filename | !files | !targetPath) {
        return false
    }

    let formData = new FormData();
    formData.append('filename', filename);
    formData.append('images', files);
    formData.append('targetPath', `${targetPath}/${Date.now()}`);

    return POST('/files/upload', formData, {
        'Content-Type': 'multipart/form-data'
    })
}
