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

        [GETTERS.FILTER_DATA]: (state) => {
          console.log('1 ' + state.searchTerm);
          if(state.searchTerm === '') {
            state.ideaList = state.session.ideas;
            return;
          }

          const searchQuery = state.searchTerm.toLowerCase();
          console.log('2 ' + searchQuery);
          console.log('3 ' + state.session.ideas);
          state.ideaList = state.session.ideas.filter(idea => {
            ['title', 'name'].some(key => {
              state.searchAttrs[key].toLowerCase().includes(searchQuery)
            }).forEach(function (id) {
              if(id === idea.id) {
                return true;
              }
            })
          })
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
    },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context) {
            return getSession()
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },
    }
};

export default store;