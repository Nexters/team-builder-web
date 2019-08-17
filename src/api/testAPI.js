import axios from "axios";

export async function get(url, header) {
    return axios.get(url, header)
        .catch(err => {
            return err
        })
}

export async function post(url, params, header) {
    return axios.post(url, params, header)
        .catch(err => {
            return err
        })
}
