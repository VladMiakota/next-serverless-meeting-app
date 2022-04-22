import axios from "axios";

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000'

const axiosConfig = axios.create({
    baseURL: baseURL,
})

export default axiosConfig
