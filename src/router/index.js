import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import StoreList from "@/pages/storeList";
import ProductDetail from "@/pages/ProductDetail";
import OrderConfirm from "@/pages/order/OrderConfirm";
import ShopDetails from '@/pages/ShopDetails';

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
    path: '/detail',
    name: 'product-detail',
    component: ProductDetail,
    children : [],
    props: route => ({
      code: route.query.code
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
