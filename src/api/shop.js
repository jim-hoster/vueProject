/* 
店铺axios请求  业务模块
 */

//  引入axios功能模块

import req from '../utils/request';

// 逐个暴露账号相关请求函数

/* 获取店铺内容详情 */
export function getShopInfo() {
    return req.get("/shop/info");
}

/* 店铺内容修改 */
export function shopEdit(params) {
    return req.post("/shop/edit", params);
}