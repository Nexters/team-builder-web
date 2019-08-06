import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';
import {getSession} from '@/api/sessionApi';

const store = {
    namespaced: true,
    state: {
        session: {
            id: 0,
            session: 0,
            period: '',
            headerImageUrl: '',
            tags:[ //전체 태그목록
                {
                    id: 0,
                    name: '',
                    type: ''
                }
            ],
            ideas:[
                {
                    id:1,
                    title: '',
                    content: '',
                    file: '',
                    selected: false,
                    type: 'IDEA', // IDEA or NOTICE
                    orderNumber: 0,
                    favorite: false,
                    tags : [ //해당 아이디어의 태그목록
                        {
                            id: 0,
                            name: '',
                            type: ''
                        }
                    ],
                    author: {
                        name: '',
                        nextersNumber: 0,
                        position: ''
                    },
                    createdAt:'',
                    updatedAt:''
                }
            ]
        }
    },

    getters: {
    },

    mutations: {
        [MUTATIONS.SET_INIT_DATA](state, {session}) {
            state.session = session;
        }
    },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context) {
            return getSession()
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },
    }
};

export default store;