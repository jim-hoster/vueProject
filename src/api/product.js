/* 
商品axios请求  业务模块
 */

//  引入axios功能模块

import req from '../utils/request';

// 逐个暴露账号相关请求函数

/* 获取分类列表 */
export function getProductCateList(params) {
    return req.get("/goods/catelist", params);
}

/* 修改分类 */
export function editCate(params) {
    return req.post("/goods/editcate", params);
}

/* 查询所有分类名称 */
export function getCateNames() {
    return req.get("/goods/categories");
}

/* 添加商品 */
export function addProduct(params) {
    return req.post("/goods/add", params);
}
/* 删除商品 */
export function delProduct(params) {
    return req.get("/goods/del", params);
}

/* 请求商品列表 */
export function getProductList(params) {
    return req.get("/goods/list", params);
}

/* 删除商品分类 */
export function delProductClass(params) {
    return req.get("/goods/delcate", params);
}
/* 添加商品分类 */
export function addProductClass(params) {
    return req.post("/goods/addcate", params);
}