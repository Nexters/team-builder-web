import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'
import store from './store/modules/auth'
import Admin from "./views/admin/Admin";

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
      path: '/info',
      name: 'Info',
      component: () => import(/* webpackChunkName: "editor" */ './views/info/Info.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ './views/NotFound.vue')
    },
    {
      path: '/session/:sessionNo',
      name: 'Session',
      component: () => import(/* webpackChunkName: "Main" */ './views/Main.vue'),
    },
    {
      path: '/session/idea/new', //TODO: 아마도 session/15/idea/new 요렇게 가야하지 않을까...?
      name: 'NewIdea',
      component: () => import(/* webpackChunkName: "Main" */ './views/NewIdea.vue'),
    },
    {
      path: '/session/idea/:ideaId', //TODO: session/15/idea/34
      name: 'IdeaDetail',
      component: () => import(/* webpackChunkName: "Main" */ './views/IdeaDetail.vue'),
    }
  ]
})
