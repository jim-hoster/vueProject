/* 
本地存储增删改查工具函数
*/

// 统一暴露
export default {
    // 获取
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    // 修改
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    // 删除
    remove(key) {
        localStorage.removeItem(key)
    },
    // 清空
    clear() {
        localStorage.clear()
    },
}