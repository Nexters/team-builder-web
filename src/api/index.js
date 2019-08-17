import axios from "axios";

const basicApi = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        //headers
    }
});

basicApi.interceptors.response.use(
    //요청 성공시
    response => {

        return response.data;
    },

    //요청 실패시
    error => {
        /*error status, code, message*/
        //Error 공통 처리 (ex. error 공통 modal or notification)

        return Promise.reject(error);
    }
);

export default basicApi;
