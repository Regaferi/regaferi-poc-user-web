import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home'),
    children : [],
    props: route => ({ isMobile: route.query.isMobile })
  },
  {
    path: '/list',
    name: 'product-list',
    component: () => import('@/pages/ProductList'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },

  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/pages/order/OrderConfirm'),
    children : [],
    props: route => ({
      code: route.query.code
    })
  }
  ,{
    path: '/firstLogin',
    name: 'firstLogin',
    component: () => import('@/pages/firstLogin'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/resume',
    name: 'resume',
    component: () => import('@/pages/resume'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('@/pages/orderDetails'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/pages/product'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer1',
    name: 'footer1',
    component: () => import('@/pages/footer/footer1'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer2',
    name: 'footer2',
    component: () => import('@/pages/footer/footer2'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer3',
    name: 'footer3',
    component: () => import('@/pages/footer/footer3'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer4',
    name: 'footer4',
    component: () => import('@/pages/footer/footer4'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/storeList',
    name: 'storeList',
    component: () => import('@/pages/storeList'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/ShopDetails',
    name: 'ShopDetails',
    component: () => import('@/pages/ShopDetails'),
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/login/callback',
    name: 'LoginCallback',
    component: () => import('@/pages/LoginCallback'),
    children : [],
    props: route => ({
      code: route.query.code,
      state: route.query.state
    })
  },
  {
    path: '/order/orderDetail',
    name: 'OrderDetail',
    component: () => import('@/pages/order/OrderDetail'),
    children : [],
    props: route => ({
      sessionId: route.query.id,
    })
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
