import axios from "axios";
import store from '@/store';

const basicApi = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

basicApi.interceptors.response.use(
    //요청 성공시
    response => {
        return response.data;
    },

    //요청 실패시
    error => {
        window.vm.$notify.error({
            title: '오류가 발생했습니다️',
            message: error
        });

        return Promise.reject(error);
    }
);

function api(headers) {
    Object.assign(basicApi.defaults, {
        headers: {
            authorization: store.getters.getToken,
            ...headers,
        }
    });

    return basicApi;
}

export function GET(url, headers) {
    return api(headers).get(url);
}

export function POST(url, data, headers) {
    return api(headers).post(url, data);
}

export function PUT(url, data, headers) {
    return api(headers).put(url, data);
}

export function DELETE(url, headers) {
    return api(headers).delete(url)
}