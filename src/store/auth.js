import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    id: '',
    auth: false,
    key: ''
  },
  getters: {
    getId (state) {
      return state.id
    },
    getAuth (state) {
      return state.auth
    },
    getKey (state) {
      return state.key
    }
  },
  mutations: {
    setId (state, id) {
      state.id = id
    },
    setAuth (state, auth) {
      state.auth = auth
    },
    setKey (state, key) {
      state.key = key
    }
  }
});
