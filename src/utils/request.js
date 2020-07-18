/*
axions接口调用工具函数
by ‘张琪’ on 2020-7-11  
*/

// 引入底层axios和qs
// axios
import axios from 'axios'
// qs
import qs from 'qs'

//某个组件需要单独引入时，可用此方法
import {
    Message
} from "element-ui";

// 引入本地存储工具函数
import local from '@/utils/local.js'

// axios设置默认url，传参时只需传入path地址
axios.defaults.baseURL = "http://127.0.0.1:5000";


// /*请求拦截： 后端响应数据之后 先拦截下来 可以进行某些处理 再接收*

axios.interceptors.request.use((config) => {
    let token = local.get('pass') || '' //取出本地存储
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

/**
 * 响应拦截： 后端响应数据之后 先拦截下来 可以进行某些处理 再接收
 */
axios.interceptors.response.use((response) => {
    // 如果有code 和 message
    if (response.data.code !== undefined && response.data.msg !== undefined) {
        let {
            code,
            msg
        } = response.data; // 解构，取出code 和 msg

        if (code === 0) {
            // 成功
            Message({
                type: "success",
                message: msg
            });
        } else if (code === 1) {
            // 失败
            Message.error(msg);
        }
    }

    return response;
});


// axios的两大方法封装   export defalut暴露两大方法
export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params
                })
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
        })
    }
}