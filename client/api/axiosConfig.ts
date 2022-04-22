import axios from "axios";

const AWS_URL = 'https://y5vm7o1v7a.execute-api.us-east-1.amazonaws.com/Prod/'
const baseURL = AWS_URL || 'http://127.0.0.1:3000'

const axiosConfig = axios.create({
    baseURL: baseURL,
})

export default axiosConfig
