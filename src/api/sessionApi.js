import api from './index';
import store from '../store/index';

import {getAuthToken} from '@/api/LoginAPI';

export async function getSession({sessionNumber}) {
    Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
    return await api.get(`apis/sessions/${sessionNumber}`);
}

export function putSession({sessionNumber, body}) {
    const token = store.getters.getToken;
    Object.assign(api.defaults, {headers: {authorization: token, 'Content-Type': 'application/json'}});

    return api.put(`apis/sessions/${sessionNumber}`, body);
}
