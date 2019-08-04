import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'
import {store} from './store/auth'

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
      path: '/main',
      name: 'mainSection',
      component: MainSection,
      props: true
    }
  ]
})
