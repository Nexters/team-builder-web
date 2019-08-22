import axios from "axios";

export async function get(url, header) {
    return axios.get(url, header)
}

export async function post(url, params, header) {
    return axios.post(url, params, header)
}

export async function put(url, params, header) {
    return axios.put(url, params, header)
}
