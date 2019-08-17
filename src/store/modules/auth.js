import {SET_AUTH, SET_ID, SET_NAME, SET_NEXTERS_NUMBER, SET_POSITION, SET_ROLE, SET_TOKEN} from "../../consts/userType";

const store = {
    state: {
        id: '',
        name: '',
        nextersNumber: '',
        role: '',
        position: '',
        auth: false,
        token: ''
    },
    getters: {
        getId(state) {
            return state.id
        },
        getName(state) {
            return state.name
        },
        getNextersNumber(state) {
            return state.nextersNumber
        },
        getRole(state) {
            return state.role
        },
        getPosition(state) {
            return state.position
        },
        getAuth(state) {
            return state.auth
        },
        getToken(state) {
            return state.token
        }
    },
    mutations: {
        [SET_ID](state, id) {
            state.id = id
        },
        [SET_NAME](state, name) {
            state.name = name
        },
        [SET_NEXTERS_NUMBER](state, nextersNumber) {
            state.nextersNumber = nextersNumber
        },
        [SET_ROLE](state, role) {
            state.role = role
        },
        [SET_POSITION](state, position) {
            state.position = position
        },
        [SET_AUTH](state, auth) {
            state.auth = auth
        },
        [SET_TOKEN](state, token) {
            state.key = token
        }
    }
};

export default store;
