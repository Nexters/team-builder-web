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
        [GETTERS.GET_LIST]: state => {
            return state.ideaList;
        },

        [GETTERS.LIST_LENGTH]: (state, getters) => {
          return getters.GET_LIST.length;
        },
    },

    mutations: {
        [MUTATIONS.SET_INIT_DATA](state, {session}) {
            state.session = session;
            state.searchTerm = '';
            state.ideaList = session.ideas.sort((idea1, idea2) => {
              return idea2.orderNumber - idea1.orderNumber;
            });
            state.searchAttrs = state.ideaList.map(function (idea) {
              return {
                id: idea.id,
                title: idea.title,
                name: idea.author.name,
                tagsId: idea.tags.map(tag => tag.id)
              }
            });
            state.sortDateASC = false;
            state.sortPositionASC = false;
        },

        [MUTATIONS.SET_SEARCH_TERM]: (state, value) => {
          state.searchTerm = value;
         },

        [MUTATIONS.SORT_LIST_BY_ORDER_NUMBER]: (state) => {
          state.ideaList.sort((idea1, idea2) => {
            return idea2.orderNumber - idea1.orderNumber;
          })
        },

        [MUTATIONS.SAVE_ORIGIN_LIST]: (state) => {
          state.ideaList = state.session.ideas;
        },

        [MUTATIONS.FILTER_DATA]: (state) => {
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

        [MUTATIONS.SORT_LIST_BY_POSITION](state) {
          state.sortPositionASC = true;
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            const position1 = idea1.author.position.toUpperCase();
            const position2 = idea2.author.position.toUpperCase();
            if(position2 < position1) return -1;
            if(position2 > position1) return 1;
            return 0;
          })
        },

        [MUTATIONS.SORT_LIST_BY_DATE](state) {
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            return new Date(idea1.createdAt) - new Date(idea2.createdAt);
          });
        }
      },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context) {
            return getSession()
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },

        [ACTIONS.ENTER_SEARCH_TERM](context) {
          return setTimeout(function () {
            context.commit(MUTATIONS.FILTER_DATA);
            context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER);
          });
        },

        [ACTIONS.SHOW_ORIGIN_LIST](context) {
          context.commit(MUTATIONS.SAVE_ORIGIN_LIST);
          context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER);
        },

        [ACTIONS.DATE_SORT_LIST](context) {
          context.commit(MUTATIONS.SORT_LIST_BY_DATE);
        },

        [ACTIONS.POSITION_SORT_LIST](context) {
          context.commit(MUTATIONS.SORT_LIST_BY_POSITION);
        },


    }
};

export default store;