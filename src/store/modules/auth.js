import {
    SET_ID,
    SET_NAME,
    SET_NEXTERS_NUMBER,
    SET_POSITION,
    SET_ROLE,
    SET_TOKEN,
    SET_AUTH,
    SET_UUID, SET_ACTIVATED
} from "../../consts/userType";
import {ROLL_TYPE} from '@/consts/rollType';

const store = {
    state: {
        id: '',
        name: '',
        activated: '',
        nextersNumber: '',
        role: '',
        position: '',
        auth: false,
        token: '',
        uuid: '',
    },
    getters: {
        getId(state) {
            return state.id
        },
        getName(state) {
            return state.name
        },
        getActivated(state) {
            return state.activated
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
        },
        getUuid(state) {
            return state.uuid;
        },
        isAdmin(state) {
            return state.role === ROLL_TYPE.ADMIN;
        }
    },
    mutations: {
        [SET_ID](state, id) {
            state.id = id
        },
        [SET_NAME](state, name) {
            state.name = name
        },
        [SET_ACTIVATED](state, activated) {
            state.activated = activated
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
            state.token = token
        },
        [SET_UUID](state, uuid) {
            state.uuid = uuid;
        }
    }
};

export default store;
