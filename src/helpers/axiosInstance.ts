import axios, { AxiosInstance } from "axios"

const BASE_URL = 'http://localhost:5000/api/v1'
// const BASE_URL = process.env.REACT_APP_API_URL

const axiosInstance: AxiosInstance = axios.create()

axiosInstance.defaults.baseURL = BASE_URL
axiosInstance.defaults.withCredentials = true

export default axiosInstance