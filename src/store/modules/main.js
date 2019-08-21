import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';
import {getSession} from '@/api/sessionApi';
import {createNewIdea, getIdea} from '@/api/ideaApi';
import id from 'bootstrap-vue/esm/mixins/id';

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
                    ideaId:1,
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
            periods: [
              {
                periodType: '',
                now: true,
                endDate: '',
                startDate: '',
              },
            ]
        },
        // search : {
          searchAttrs: [{
            ideaId: 0,
            title: '',
            authorName: '',
            tagsId: []
          }],
          searchTerm: '',
          selectedTags: [
            {
              tagId: 0,
              name: ''
            },
          ],
        candidateIdeas: [
          {
            ideaId: 0,
            title: ''
          }
        ],
        // },
        ideaList: [
          {
            ideaId:1,
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
      },

      [GETTERS.SEARCH_TAG_LIST_LENGTH]: (state) => {
        return state.selectedTags.length;
      },

      [GETTERS.GET_SEARCH_TAGS_FIRST_NAME]: (state) => {
        return state.selectedTags.length > 0 ? state.selectedTags[0].name : "";
      },

      [GETTERS.GET_NOW_SESSION_NUMBER]: (state) => {
        return state.session.sessionNumber;
      },

      [GETTERS.GET_PERIOD_TYPE_NOW]: (state) => {
        const period = state.session.periods.find(element => {
          return element.now;
        });
        return period === undefined ? '' : period.periodType;
      },
    },

    mutations: {
      [MUTATIONS.SET_INIT_DATA](state, data) {
        const session = data.data;
        state.session = session;
        state.searchTerm = '';
        state.ideaList = session.ideas.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;
          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          const periodCheck = session.periods.find(element => element.periodType === 'IDEA_CHECK').now;
          if(periodCheck) {
            const idea1Selected = idea1.selected;
            const idea2Selected = idea2.selected;
            if(idea1Selected && !idea2Selected) return -1;
            if(!idea1Selected && idea2Selected) return 1;
          }

          return idea2.orderNumber - idea1.orderNumber;
        });
        state.searchAttrs = state.ideaList.map(function (idea) {
          return {
            ideaId: idea.ideaId,
            title: idea.title,
            authorName: idea.author.name,
            tagsId: idea.tags.map(tag => tag.tagId)
          }
        });
        state.session.tags = session.tags;
        state.candidateIdeas = [];
        state.selectedTags = [];
      },

      [MUTATIONS.SET_SEARCH_TERM]: (state, value) => {
        state.searchTerm = value;
      },

      [MUTATIONS.SORT_LIST_BY_ORDER_NUMBER]: (state) => {
        state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;
          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          const idea1Selected = idea1.selected;
          const idea2Selected = idea2.selected;
          if(idea1Selected && !idea2Selected) return -1;
          if(!idea1Selected && idea2Selected) return 1;

          return idea2.orderNumber - idea1.orderNumber;
        })
      },

      [MUTATIONS.SAVE_ORIGIN_LIST]: (state) => {
        state.ideaList = state.session.ideas;
      },

      [MUTATIONS.FILTER_DATA]: (state) => {
        console.log('Mutation')
        // 검색어에 영어가 포함될 경우
        if (state.searchTerm.match('^[ㄱ-ㅎ가-힣]*$')) {
          console.log('한글이얌')
          // 검색어에 한글이 포함될 경우
          const ChosungSearch = require('hangul-chosung-search-js');
          let titleAndNameArray = state.searchAttrs.map((element) => {
            return element.title
          })
            .concat(state.searchAttrs.map((element) => {
              return element.name
            }));

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
              if (filtered === attr.title || filtered === attr.authorName) {
                return attr.ideaId;
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
          if (idea.id === search.id) {
            return true;
          }
        })
      },

      [MUTATIONS.SORT_LIST_BY_POSITION_ASC](state) {
        state.ideaList = state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;

          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          const position1 = idea1.author.position.toUpperCase();
          const position2 = idea2.author.position.toUpperCase();

          return position1 === position2 ? idea2.orderNumber - idea1.orderNumber
            : (position1 < position2 ? -1 : 1);
        })
      },

      [MUTATIONS.SORT_LIST_BY_DATE_ASC](state) {
        state.ideaList = state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;

          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          return new Date(idea1.createdAt) - new Date(idea2.createdAt);
        });
      },

      [MUTATIONS.SORT_LIST_BY_POSITION_DESC](state) {
        state.ideaList = state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;

          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          const position1 = idea1.author.position.toUpperCase();
          const position2 = idea2.author.position.toUpperCase();

          return position2 === position1 ? idea2.orderNumber - idea1.orderNumber
            : (position2 > position1 ? -1 : 1);
        })
      },

      [MUTATIONS.SORT_LIST_BY_DATE_DESC](state) {
        state.ideaList = state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;

          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;

          return new Date(idea2.createdAt) - new Date(idea1.createdAt);
        })
      },

      [MUTATIONS.SET_FAVORITE_LIST](state) {
        state.ideaList = state.session.ideas.filter(idea => {
          return idea.favorite;
        })
      },

      [MUTATIONS.SET_FAVORITE_OPPOSITE]: (state, id) => {
        const changeElement = state.ideaList.find(idea => (idea.ideaId === id));
        changeElement.favorite = !changeElement.favorite
        return changeElement.favorite
      },

      [MUTATIONS.SELECT_TAG]: (state, id) => {
        const tag = state.session.tags.find(tag => (tag.tagId === id));
        state.selectedTags.push({tagId: id, name: tag.name});
        console.log(state.selectedTags);
      },

      [MUTATIONS.SET_INIT_SELECTED_TAGS]: (state) => {
        state.selectedTags =  [];
      },

      /**
       * 아이디어 투표할 때, 이미 클릭한 아이디어면 투표 후보 배열에서 제거 / 아니면 추가
       * @param state
       * @param id  idea.ideaId
       */
      [MUTATIONS.CLICK_IDEAS]: (state, id) => {
        const idx = state.candidateIdeas.findIndex(idea => (idea.ideaId === id));
        // 이미 선택된 아이디어일 경우
        if (idx > -1) {
          state.candidateIdeas.splice(idx, 1);
          return;
        }
        // 선택 되지 않은 아이디어라면,
        const selectedIdea = state.ideaList.find(idea => (idea.ideaId === id));
        state.candidateIdeas.push({ideaId: id, title: selectedIdea.title});
      },

      [MUTATIONS.SORT_LIST_BY_VOTE_NUMBER_DESC]: (state) => {
        state.ideaList = state.ideaList.sort((idea1, idea2) => {
          const idea1Type = idea1.type;
          const idea2Type = idea2.type;
          if(idea1Type > idea2Type) return -1;
          if(idea1Type < idea2Type) return 1;
          return idea2.voteNumber === idea1.voteNumber ? idea2.orderNumber - idea1.orderNumber
          : idea2.voteNumber - idea1.voteNumber;
        })
      },

    },

    actions: {
        [ACTIONS.LOAD_INIT_DATA](context, {sessionNumber}) {
            return getSession({sessionNumber: sessionNumber})
                .then(data => context.commit(MUTATIONS.SET_INIT_DATA, data));
        },

      /**
       * 검색 결과 값을 포함한 리스트를 최신순으로 정렬
       * @param context
       * @returns {number}
       */
        [ACTIONS.ENTER_SEARCH_TERM](context) {
          return setTimeout(function () {
            context.commit(MUTATIONS.FILTER_DATA);
            context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER);
          });
        },

      /**
       * 기존 아이디어 리스트를 최신순으로 정렬
       * @param context
       */
        [ACTIONS.SHOW_ORIGIN_LIST](context) {
          context.commit(MUTATIONS.SAVE_ORIGIN_LIST);
          context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER);
        },

      /**
       * 아이디어 즐겨찾기 상태 변화
       * @param context
       * @param id  ideaId
       */
        [ACTIONS.FAVORITE_CHANGE](context, id) {
          context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE, id);
        },

        [ACTIONS.SEARCH_TAGS](context) {
          // 서버로 전송
          // 받아온 리스트 ideaList에 저장
        },

        /**
         * 아이디어/공지사항 작성
         * @param context
         * @param newIdea
         */
        [ACTIONS.CREATE_NEW_IEDA](context, newIdea) {
            return createNewIdea(newIdea);
        },

        /**
         * 아이디어 상세 조회
         */
        [ACTIONS.GET_IDEA](context, ideaId) {
            return getIdea(ideaId);
        }
    }
};

export default store;