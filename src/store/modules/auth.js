import {
    SET_ID,
    SET_NAME,
    SET_NEXTERS_NUMBER,
    SET_POSITION,
    SET_ROLE,
    SET_TOKEN,
    SET_AUTH,
    SET_UUID, SET_ACTIVATED,
    RELOAD_AUTH,
    CLEAR_AUTH
} from "../../consts/userType";
import {ROLL_TYPE} from '@/consts/rollType';
import {SET_EMAIL, SET_HAS_TEAM, SET_NEW_AUTH, SET_SUBMIT_IDEA, SET_VOTE_COUNT, SET_VOTED} from '@/consts/userType';
import {info} from '@/api/LoginAPI';

function initialState() {
    return {
        id: '',
        name: '',
        activated: '',
        nextersNumber: '',
        role: '',
        position: '',
        auth: false,
        token: '',
        uuid: '',
        email: '',
        hasTeam: false,
        submitIdea: false,
        voteCount: 0,
        voted: false,
    };
}

const store = {
    state: initialState,
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
        },
        [SET_EMAIL](state, email) {
            state.email = email;
        },
        [SET_HAS_TEAM](state, hasTeam) {
            state.hasTeam = hasTeam;
        },
        [SET_SUBMIT_IDEA](state, submitIdea) {
            state.submitIdea = submitIdea;
        },
        [SET_VOTE_COUNT](state, voteCount) {
            state.voteCount = voteCount;
        },
        [SET_VOTED](state, voted) {
            state.voted = voted;
        },
        [SET_NEW_AUTH](state, {newAuth}) {
            state.id = newAuth.id;
            state.name = newAuth.name;
            state.activated = newAuth.activated;
            state.nextersNumber = newAuth.nextersNumber;
            state.role = newAuth.role;
            state.position = newAuth.position;
            state.email = newAuth.email;
            state.hasTeam = newAuth.hasTeam;
            state.submitIdea = newAuth.submitIdea;
            state.voteCount = newAuth.voteCount;
            state.voted = newAuth.voted;
        },

        [CLEAR_AUTH](state) {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        }
    },

    actions: {
        /**
         * auth reload (아이디어 작성, 투표 시)
         * @param state
         */
        [RELOAD_AUTH]({state, commit}) {
            info(state.token)
                .then(data => {
                    const newAuth = data.data;
                    commit(SET_NEW_AUTH, {newAuth});
                });
        }
    },
};

export default store;
