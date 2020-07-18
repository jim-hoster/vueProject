/* 
订单axios请求  业务模块
 */

//  引入axios功能模块

import req from '../utils/request';

// 逐个暴露账号相关请求函数

/* 获取订单列表 */
export function getOrderList(params) {
    return req.get("/order/list", params);
}

/* 修改订单 */
export function editOrder(params) {
    return req.post("/order/edit", params);
}
/* 获取订单列表详情 */
export function OrderDetail(params) {
    return req.get("/order/detail", params);
}
/* 获取首页统计数据 */
export function IndexData() {
    return req.get("/order/totaldata");
}
/* 获取订单列表统计数据 */
export function OrderListData(params) {
    return req.get("/order/ordertotal", params);
}