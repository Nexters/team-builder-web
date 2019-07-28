import Vue from 'vue'
import Vuex from 'vuex'
import {SET_ID, SET_AUTH, SET_TOKEN} from "../consts/userType"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        id: '',
        auth: false,
        key: ''
    },
    getters: {
        getId(state) {
            return state.id
        },
        getAuth(state) {
            return state.auth
        },
        getKey(state) {
            return state.key
        }
    },
    mutations: {
        [SET_ID](state, id) {
            state.id = id
        },
        [SET_AUTH](state, auth) {
            state.auth = auth
        },
        [SET_TOKEN](state, token) {
            state.key = token
        }
    }
});
