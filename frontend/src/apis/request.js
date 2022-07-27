import axios from "axios";

const DOMAIN = "http://127.0.0.1:8000/api";

axios.defaults.withCredentials = true;

export const request = (method, url,data, headers="") => {
    console.log(
        `method : ${method} / url : ${url} / headers : ${headers} / data : ${data}`
    );

    // console.log(headers);
    // console.log(data);

    return axios({
        method : method,
        url : DOMAIN + url,
        headers : headers,
        data : data,
    })
    .then((res)=> res)
    .catch((err)=> console.log(err));
}