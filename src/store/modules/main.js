import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';
import {getSession} from '@/api/sessionApi';

// 가독성을 위해 데이터 폼 표시
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
        },
        searchAttrs: [{
              id: 0,
              title: '',
              name: ''
          }],
        searchTerm: '',
        ideaList: [
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
        ],

    },

    getters: {
        [GETTERS.SHOW_LIST]: state => {
            return state.ideaList;
        },

        [GETTERS.LIST_LENGTH]: (state, getters) => {
          return getters.SHOW_LIST.length;
        },

        [GETTERS.FILTER_DATA]: (state, searchQuery) => {
          if(typeof searchQuery === 'undefined') {
            state.ideaList = state.ideas;
            return;
          }

          if(typeof searchQuery === 'string') {
            state.searchTerm = searchQuery.toLowerCase();
            if(state.searchTerm === '') {
              state.ideaList = state.ideas;
              return;
            }
          }

          //   state.ideaList = state.ideas.filter(idea => {
          //
          //       ['titles', 'name'].some(function (search) {
          //
          //       })
          //   })
          //
          // state.ideaList = state.ideas.forEach(idea => {
          //   state.searchAttrs.filter(idea => {
          //     ['title', 'name'].some(function (key) {
          //       if(idea[key].toLowerCase().includes(searchTerm)) {
          //         return idea.id;
          //       }
          //     })
          //   })
          // })
          //

          // state.searchAttrs.forEach(item, index) {
          //       if()
          // }




            return state.session.ideas;
        },
    },

    mutations: {
        [MUTATIONS.SET_INIT_DATA](state, {session}) {
            state.session = session;
            state.searchTerm = '';
            state.ideaList = session.ideas;
            state.searchAttrs = session.ideas.forEach(function (idea) {
                return {
                    id: idea.id,
                    title: idea.title,
                    name: idea.author.name};
                });
        },
      // TO-DO state.searchTerm 저장하는 SET_SEARCH_TERM
    },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context) {
            return getSession()
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },
    }
};

export default store;