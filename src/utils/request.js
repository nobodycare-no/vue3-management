import axios from 'axios'
import qs from "querystring"

const baseURL =
    import.meta.env.VITE_API_BASE ||
    (import.meta.env.DEV ? '/api' : 'http://localhost:3000/api')

const instance = axios.create({
    baseURL,
    timeout: 15000,
})

const errorHandler = (status, info) => {
    switch(status) {
        case 400:
            console.log("请求错误");
            break;
        case 401:
            console.log("未授权访问");
            break;
        case 403:
            console.log("禁止访问");
            break;
        case 404:
            console.log("请求地址出错");
            break;
        case 408:
            console.log("请求超时");
            break;
        case 500:
            console.log("服务器内部错误");
            break;
        case 501:
            console.log("服务未实现");
            break;
        case 502:
            console.log("网关错误");
            break;
    }
}

instance.interceptors.request.use(
    config => {
        if(config.method == "post" || config.method == "put") {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error
        if (response) {
            errorHandler(response.status, response.info)
        }
        return Promise.reject(error)
    }
)

export default instance