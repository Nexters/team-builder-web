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
              name: '',
              tagsId: []
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
    },

    mutations: {
        [MUTATIONS.SET_INIT_DATA](state, {session}) {
            state.session = session;
            state.searchTerm = '';
            state.ideaList = session.ideas;
            state.searchAttrs = state.ideaList.map(function (idea) {
              return {
                id: idea.id,
                title: idea.title,
                name: idea.author.name,
                tagsId: idea.tags.map(tag => tag.id)
              }
            });
        },

        [MUTATIONS.SET_SEARCH_TERM] (state, value) {
          state.searchTerm = value;
          console.log('value ' + value);
          console.log('searchTerm ' + searchTerm)
        },

        [MUTATIONS.FILTER_DATA]: (state) => {
          console.log('1 ' + state.searchTerm);
          if(state.searchTerm === '') {
            state.ideaList = state.session.ideas;
            return;
          }

          const searchQuery = state.searchTerm.toLowerCase();
          console.log('2 ' + searchQuery);
          console.log('3 ' + state.session.ideas);
          const search = state.searchAttrs.filter(element => {
            ['title', 'name'].some(key => {
            // console.log(element[key]);
              const char = element[key].toLowerCase();
            // element[key].toLowerCase().includes(searchQuery))
              if (char.includes(searchQuery)) {
                return true;
              }
            })
          });
          state.ideaList = state.session.ideas.filter(idea => {
            if(idea.id === search.id) {
              return true;
            }
          })
        },
      },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context) {
            return getSession()
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },

        [ACTIONS.ENTER_SEARCH_TERM](context, payload) {
          return setTimeout(function () {
            context.commit(MUTATIONS.FILTER_DATA);
          }, payload.duration);
        }
    }
};

export default store;