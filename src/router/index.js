import Vue from 'vue';
import VueRouter from 'vue-router';
import Maintain from "@/components/Maintain";
import Home from "@/pages/Home";

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
    path: '/explore',
    name: 'explore',
    component: Maintain,
    children : [],
    props: route => ({ isMobile: route.query.isMobile })
  },
  {
    path: '/about',
    name: 'about',
    component: Maintain,
    children : [],
    props: route => ({ isMobile: route.query.isMobile })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
