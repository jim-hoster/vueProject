/* 
账号axios请求  业务模块
 */

//  引入axios功能模块

import req from '../utils/request';

// 逐个暴露账号相关请求函数

// 添加账号
export function addAccount(params) {
    return req.post('/users/add', params)
}
// 获取账号列表
export function accountList(params) {
    return req.get('/users/list', params)
}
// 删除账号
export function delAccount(params) {
    return req.get('/users/del', params)
}
// 批量删除账号
export function batchdelAccount(params) {
    return req.get('/users/batchdel', params)
}
// 修改账号
export function editAccount(params) {
    return req.post('/users/edit', params)
}
// 检查旧密码
export function checkOldPwd(params) {
    return req.get('/users/checkoldpwd', params)
}
// 修改密码
export function editPwd(params) {
    return req.post('/users/editpwd', params)
}
// 获取用户个人信息
export function personInfo() {
    return req.get('/users/info')
}
//修改用户头像
export function avatarEdit() {
    return req.get('/users/avataredit')
}