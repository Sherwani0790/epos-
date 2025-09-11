import axios from "axios";

export const apiEPOS = axios.create({
    baseURL: "http://192.168.4.19:5001/api/",
    headers: {
        Accept: "application/json",
    },
});
