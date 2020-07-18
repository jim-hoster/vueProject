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
      name: 'Home',
      component: () =>
        import('../views/Layout/right/content/Home/Home.vue')
    }, ]
  },

  // 订单管理懒加载
  {
    path: '/order',
    meta: {
      title: '订单管理'
    },
    component: Layout,
    children: [{
        path: '/order',
        name: 'OrderList',
        component: () =>
          import('../views/Layout/right/content/Order/Order.vue'),
        meta: {
          title: '订单列表'
        }
      },

      {
        path: '/order/order-edit',
        name: 'OrderEdit',
        component: () =>
          import('../views/Layout/right/content/Order/orderEdit.vue'),
        meta: {
          title: '订单编辑'
        }
      },
    ]
  },

  // 商品管理路由懒加载
  {
    path: '/product',
    redirect: '/product/product-list',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    children: [{
        path: '/product/product-list',
        name: 'ProductList',
        component: () =>
          import('../views/Layout/right/content/Product/ProductList.vue'),
        meta: {
          title: '商品列表'
        },
      }, {
        path: '/product/add-product',
        name: 'AddProduct',
        component: () =>
          import('../views/Layout/right/content/Product/AddProduct.vue'),
        meta: {
          title: '添加商品'
        },
      },
      {
        path: '/product/product-class',
        name: 'ProductClass',
        component: () =>
          import('../views/Layout/right/content/Product/ProductClass.vue'),
        meta: {
          title: '商品分类'
        },
      },
    ]
  },

  // 店铺管理懒加载
  {
    path: '/shop',
    component: Layout,
    meta: {
      title: '店铺管理'
    },
    children: [{
      path: '/shop',
      name: 'Shop',
      component: () =>
        import('../views/Layout/right/content/Shop/Shop.vue')
    }]
  },

  // 账号管理
  {
    path: '/account',
    redirect: '/account/account-list',
    component: Layout,
    meta: {
      title: '账号管理'
    },
    children: [{
        path: '/account/account-list',
        component: () =>
          import('../views/Layout/right/content/Account/AccountList.vue'),
        meta: {
          title: '账号列表'
        },
      }, {
        path: '/account/add-account',
        component: () =>
          import('../views/Layout/right/content/Account/AddAccount.vue'),
        meta: {
          title: '添加账号'
        },
      },
      {
        path: '/account/change-account',
        component: () =>
          import('../views/Layout/right/content/Account/ChangeAccount.vue'),
        meta: {
          title: '修改账号'
        },
      },
      {
        path: '/account/person',
        component: () => import('../views/Layout/right/content/Account/Person.vue'),
        meta: {
          title: '个人中心'
        },
      }
    ]
  },

  // 销售统计
  {
    path: '/sales',
    redirect: '/sales/product-sale',
    component: Layout,
    meta: {
      title: '销售统计'
    },
    children: [{
        path: '/sales/product-sale',
        component: () =>
          import('../views/Layout/right/content/Sales/ProductSales.vue'),
        meta: {
          title: '商品统计'
        },
      },
      {
        path: '/sales/order-sale',
        component: () =>
          import('../views/Layout/right/content/Sales/OrderSales.vue'),
        meta: {
          title: '订单统计'
        },
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router