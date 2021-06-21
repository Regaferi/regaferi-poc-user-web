import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import StoreList from "@/pages/storeList";
import product from "@/pages/product";
import OrderConfirm from "@/pages/order/OrderConfirm";
import ShopDetails from '@/pages/ShopDetails';
import LoginCallback from "@/pages/LoginCallback";
import OrderDetail from "@/pages/order/OrderDetail";
import resume from "@/pages/resume";
import firstLogin from "@/pages/firstLogin";
import details from "@/pages/orderDetails";
import footer1 from "@/pages/footer/footer1";
import footer2 from "@/pages/footer/footer2";
import footer3 from "@/pages/footer/footer3";
import footer4 from "@/pages/footer/footer4";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children : [],
    props: route => ({ isMobile: route.query.isMobile })
  },
  {
    path: '/list',
    name: 'product-list',
    component: ProductList,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },

  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: OrderConfirm,
    children : [],
    props: route => ({
      code: route.query.code
    })
  }
  ,{
    path: '/firstLogin',
    name: 'firstLogin',
    component: firstLogin,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/resume',
    name: 'resume',
    component: resume,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/details',
    name: 'details',
    component: details,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/product',
    name: 'product',
    component: product,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer1',
    name: 'footer1',
    component: footer1,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer2',
    name: 'footer2',
    component: footer2,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer3',
    name: 'footer3',
    component: footer3,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },{
    path: '/footer4',
    name: 'footer4',
    component: footer4,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/storeList',
    name: 'storeList',
    component: StoreList,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/ShopDetails',
    name: 'ShopDetails',
    component: ShopDetails,
    children : [],
    props: route => ({
      category: route.query.category,
      property: route.query.property
    })
  },
  {
    path: '/login/callback',
    name: 'LoginCallback',
    component: LoginCallback,
    children : [],
    props: route => ({
      code: route.query.code,
      state: route.query.state
    })
  },
  {
    path: '/order/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail,
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
