import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.103:3000/api",
  // baseURL: "http://192.168.1.106:3000/api",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  timeout: 10000, //10 sn
});

export default axiosInstance;
