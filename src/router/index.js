import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录与布局路由
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
Vue.use(VueRouter)
// 主页只引入独立业务的模块，其他使用懒加载
const routes = [{
    path: '/login',
    component: Login
  },

  // 后端布局首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      component: () =>
        import('../views/Layout/right/content/Home/Home.vue')
    }, ]
  },

  // 订单管理懒加载
  {
    path: '/order',
    component: Layout,
    children: [{
      path: '/order',
      component: () =>
        import('../views/Layout/right/content/Order/Order.vue')
    }]
  },

  // 商品管理路由懒加载
  {
    path: '/product',
    component: Layout,
    children: [{
        path: '/product/product-list',
        component: () =>
          import('../views/Layout/right/content/Product/ProductList.vue')
      }, {
        path: '/product/add-product',
        component: () =>
          import('../views/Layout/right/content/Product/AddProduct.vue')
      },
      {
        path: '/product/product-class',
        component: () =>
          import('../views/Layout/right/content/Product/ProductClass.vue')
      },
    ]
  },

  // 店铺管理懒加载
  {
    path: '/shop',
    component: Layout,
    children: [{
      path: '/shop',
      component: () =>
        import('../views/Layout/right/content/Shop/Shop.vue')
    }]
  },

  // 账号管理
  {
    path: '/account',
    component: Layout,
    children: [{
        path: '/account/account-list',
        component: () =>
          import('../views/Layout/right/content/Account/AccountList.vue')
      }, {
        path: '/account/add-account',
        component: () =>
          import('../views/Layout/right/content/Account/AddAccount.vue')
      },
      {
        path: '/account/change-account',
        component: () =>
          import('../views/Layout/right/content/Account/ChangeAccount.vue')
      },
    ]
  },

  // 销售统计
  {
    path: '/sales',
    component: Layout,
    children: [{
        path: '/sales/product-sale',
        component: () =>
          import('../views/Layout/right/content/Sales/ProductSales.vue')
      },
      {
        path: '/sales/order-sale',
        component: () =>
          import('../views/Layout/right/content/Sales/OrderSales.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router