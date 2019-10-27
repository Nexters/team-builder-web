import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import main from './modules/main';
import common from './modules/common';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        main,
        common
    },
    strict: true,
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
    ]
})

