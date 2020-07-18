/*
数据统计后端数据业务模块 
 */

//  引入发送工具函数

import req from '../utils/request'

// 暴露业务模块  准备组件调用

// 登录函数
export function orderStats(params) {
    return req.get('/order/ordertotal', params)
}

// 