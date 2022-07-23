import axios, { Axios } from "axios";
import { getCookie } from "utils/Cookie";

axios.defaults.withCredentials = true;

const AxiosAPI = axios.create({
    baseURL : 'http://127.0.0.1:8000/api',
    timeout : 180000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${getCookie('access-token')}`
    },
})

AxiosAPI.defaults.withCredentials = true;

export default AxiosAPI;

