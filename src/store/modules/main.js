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
        // search : {
          searchAttrs: [{
            id: 0,
            title: '',
            name: '',
            tagsId: []
          }],
          searchTerm: '',
          selectedTags: [
            {id: 0},
          ],
        // },
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

        [GETTERS.GET_FAVORITE]: (state, orderNumber) => {
          return state.ideaList.filter(idea => (idea.orderNumber === orderNumber))
            .favorite;
        },

        [GETTERS.GET_TAGS]: (state) => {
           return state.session.tags;
        }
    },

    mutations: {
        [MUTATIONS.SET_INIT_DATA](state, data) {
            const session = data.data;
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
            state.session.tags = session.tags;
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
          console.log('Mutation')
          // 검색어에 영어가 포함될 경우
          if(state.searchTerm.match('^[ㄱ-ㅎ가-힣]*$')) {
            console.log('한글이얌')
            // 검색어에 한글이 포함될 경우
            const ChosungSearch = require('hangul-chosung-search-js');
            let titleAndNameArray = state.searchAttrs.map((element) => {return element.title})
              .concat(state.searchAttrs.map((element) => {return element.name}));

            console.log('titleAndNameArray :' + titleAndNameArray);
            console.log('state.searchAttrs :' + state.searchAttrs)

            const filteredList = ChosungSearch.searchList(state.searchTerm, titleAndNameArray, true);
            // const temp = state.searchAttrs.map(attr => {
            //   filteredList.some((element) => {
            //     console.log(element);
            //     console.log(attr);
            //     if(attr.title === element || attr.name === element) {
            //       return parseInt(attr.id + '', 10);
            //     }
            //   })
            // });

            const temp = state.searchAttrs.map(attr => {
              filteredList.map(filtered => {
                if(filtered === attr.title || filtered === attr.name) {
                  return attr.id;
                }
              })
            });


            console.log('element');
            console.log(temp.length);

              // filter((attr) => {
            //   filteredList.forEach(function (element) {
            //     if(element === attr.name || element === attr.title) {
            //       return attr;
            //     }
            //   })
            // });
            console.log('temp: ' + temp);
            // state.ideaList = state.session.ideas.filter(idea => {
            //   if(idea.id === temp.id) {return true}
            // });
            // state.ideaList = state.session.ideas.filter((idea) => {
            //   filteredList.some((attr) => {
            //     // if(attr === idea.author.name || attr === idea.title) return true;
            //     return idea.author.name === attr || idea.title === attr
            //   })
            // });
            console.log('1: ' + filteredList);
            console.log('2: ' + state.ideaList);
            return;
          }
          console.log('요긴 영어')
          const searchQuery = state.searchTerm.toLowerCase();
          console.log(searchQuery)
          const search = state.searchAttrs.filter(element => {
            ['title', 'name'].some(key => {
              const char = element[key].replace(/^[A-Za-z+]*$/gi).toLowerCase();
              console.log('char: ' + char);
              // element[key].toLowerCase().includes(searchQuery))
              if (char.indexOf(searchQuery) !== -1) {
                return true;
              }
            })
          });
          console.log(search);
          state.ideaList = state.session.ideas.filter(idea => {
            if(idea.id === search.id) {
              return true;
            }
          })
        },

        [MUTATIONS.SORT_LIST_BY_POSITION_ASC](state) {
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            const position1 = idea1.author.position.toUpperCase();
            const position2 = idea2.author.position.toUpperCase();

            if(position1 < position2) return -1;
            if(position1 > position2) return 1;
            return idea2.orderNumber - idea1.orderNumber;
          })
        },

        [MUTATIONS.SORT_LIST_BY_DATE_ASC](state) {
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            const minusDate = new Date(idea1.createdAt) - new Date(idea2.createdAt);
            return minusDate === 0 ?
              idea2.orderNumber - idea1.orderNumber : minusDate;
          });
        },

        [MUTATIONS.SORT_LIST_BY_POSITION_DESC](state) {
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            const position1 = idea1.author.position.toUpperCase();
            const position2 = idea2.author.position.toUpperCase();
            if(position2 < position1) return -1;
            if(position2 > position1) return 1;
            return idea2.orderNumber - idea1.orderNumber;
          })
        },

        [MUTATIONS.SORT_LIST_BY_DATE_DESC](state) {
          state.ideaList = state.ideaList.sort((idea1, idea2) => {
            const minusDate = new Date(idea2.createdAt) - new Date(idea1.createdAt);
            return minusDate === 0 ?
              idea2.orderNumber - idea1.orderNumber : minusDate;
          })
        },

        [MUTATIONS.SET_FAVORITE_LIST](state) {
          state.ideaList = state.session.ideas.filter(idea => {
            return idea.favorite;
          })
        },

        // 서버 연동 => 실제로 변경
        [MUTATIONS.SET_FAVORITE_OPPOSITE]: (state, id) => {
          const changeElement = state.ideaList.find(idea => (idea.id === id));
          changeElement.favorite = !changeElement.favorite
          return changeElement.favorite
        },

        [MUTATIONS.SELECT_TAG]: (state, id) => {
          state.selectedTags.push({id: id});
          console.log(state.selectedTags);
        },

        [MUTATIONS.SET_INIT_SELECTED_TAGS]: (state) => {
          state.selectedTags = [];
        }

      },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context, {sessionNumber}) {
            return getSession({sessionNumber: sessionNumber})
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

        [ACTIONS.FAVORITE_CHANGE](context, id) {
          context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE, id);
        }
    }
};

export default store;