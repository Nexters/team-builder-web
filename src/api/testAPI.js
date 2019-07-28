import axios from "axios";

export async function get(url, params) {
    return axios.get(url, params)
        .catch(err => {
            alert("error!!", err);
            return err
        })
}

export async function post(url, params) {
    axios.get(url, params)
        .catch(err => {
            alert("error!!", err);
            return err
        })
}
