import axios from "axios";

const BASE_URL = 'https://one00b.onrender.com'

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})