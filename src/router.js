import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'
import store from './store/modules/auth'

import MainSection from './views/main/MainSection'

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  if (store.getters.getAuth) return next();
  next('/login')
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth()
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/example',
      name: 'Example',
      component: () => import(/* webpackChunkName: "example" */ './views/Example.vue')
    },
    {
      path: '/editor',
      name: 'Editor',
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue')
    },
    {
      path: '/info',
      name: 'Info',
      component: () => import(/* webpackChunkName: "editor" */ './views/info/Info.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "example" */ './views/Example.vue') //TODO 잘못된 경로 접근 404페이
    },
    {
      path: '/main',
      name: 'MainSection',
      component: () => import('./components/main/mainSection'),
      props: true
    },
    {
      path: '/mainLayout',
      name: 'Main',
      component: () => import(/* webpackChunkName: "MainLayout" */ './views/MainLayout.vue')
    },
  ]
})
