import Vue from 'vue';
import Vuex from 'vuex';
import example from './modules/example';
import auth from './modules/auth';
import main from './modules/main';
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        example,
        auth,
        main,
    },
    strict: true,
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
    ]
})

