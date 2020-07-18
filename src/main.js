import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入eleui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入Echarts，
import echarts from 'echarts'
// 引入iconfont字体库
import './assets/font/iconfont.css'
// 引入时间处理函数
import moment from 'moment'
// 初始化样式
import './assets/css/reset.min.css'
import './assets/css/common.less'
// 创建一个vue的bus实例中介
Vue.prototype.$bus = new Vue();

Vue.prototype.$moment = moment
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')