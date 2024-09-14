import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 5000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 添加请求头等前置处理
        config.headers['Authorization'] = 'Bearer' + ' ' + localStorage.getItem('token')
        return config
    },
    error => {
        // 请求错误处理
        console.log('Request Error:', error)
        return Promise.reject(error)
    }
)

export default axiosInstance