import axios from "axios";

const DOMAIN = "http://localhost:8000/api";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해

export const request = (method, url, data, auth) => {
  return axios({
    method,
    url: DOMAIN + url,
    data : data,
    headers : auth
  })
    // .then((res) => res.data)
    // .catch((err) => console.log(err));
};