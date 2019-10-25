import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

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
            redirect: {path: 'session/latest'},
            beforeEnter: requireAuth()
        },
        {
            path: '/about',
            name: 'about',
            beforeEnter: requireAuth(),
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () => import(/* webpackChunkName: "Main" */ './views/signup/Signup.vue'),
            props: true
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "Main" */ './views/login/Login.vue'),
            props: true
        },
        {
            path: '/example',
            name: 'Example',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "example" */ './views/Example.vue')
        },
        {
            path: '/info',
            name: 'Info',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "editor" */ './views/info/Info.vue')
        },
        {
            path: '/session/:sessionNumber',
            name: 'Session',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/Main.vue'),
        },
        {
            path: '/session/:sessionNumber/idea/new',
            name: 'NewIdea',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/NewIdea.vue'),
        },
        {
            path: '/session/:sessionNumber/idea/:ideaId/modify',
            name: 'IdeaModify',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/IdeaModify.vue'),
        },
        {
            path: '/session/:sessionNumber/idea/:ideaId',
            name: 'IdeaDetail',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/IdeaDetail.vue'),
        },
        {
            path: '/all-user-manager',
            name: 'AllUserManage',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/admin/AllUserManage.vue'),
        },
        {
            path: '/session/:sessionNumber/general-manage',
            name: 'GeneralManage',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/admin/GeneralManage.vue'),
        },
        {
            path: '/session/:sessionNumber/user-manage',
            name: 'TeamBuildingManage',
            beforeEnter: requireAuth(),
            component: () => import(/* webpackChunkName: "Main" */ './views/admin/TeamBuildingManage.vue'),
        },
        {
            path: '*',
            name: 'ErrorPage404',
            component: () => import(/* webpackChunkName: "Main" */ './views/error/ErrorPage404.vue')
        },
    ]
})
