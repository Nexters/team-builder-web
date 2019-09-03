import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';
import {getSession} from '@/api/sessionApi';
import {createNewIdea, deleteFavorite, deleteIdea, getIdea, putVoteIdea, setFavorite, updateIdea, modifyIdea} from '@/api/ideaApi';

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
      nowPeriod: {},
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

      [GETTERS.SELECTED_IDEA_LIST_LENGTH]: (state) => {
        return state.ideaList.filter(idea => idea.selected).length;
      }
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
        state.session.tags = session.tags.map(function (tag) {
          return {
            name: tag.name,
            tagId: tag.tagId,
            type: tag.type,
            state: false
          }
        });
        state.candidateIdeas = [];

        // 투표예시데이터
        // state.candidateIdeas = [
        //   {
        //     id: '1',
        //     title: '일이삼사오육칠팔구십일이'
        //   },
        //   {
        //     id: '2',
        //     title: '일이삼사오육칠팔구십일이일이삼사오육칠팔구십일이'
        //   },
        //   {
        //     id: '3',
        //     title: '일이삼사오육칠팔구십일이일이삼사오육칠팔구십일이'
        //   }
        // ];


        state.selectedTags = [];
        state.nowPeriod = session.periods.find(period => period.now);
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
        // 한글
        if (state.searchTerm.match('^[ㄱ-ㅎ가-힣]*$')) {
          const ChosungSearch = require('hangul-chosung-search-js');
          // 타이틀과 작성자 이름만 따로 저장 -> 여기서 검색어로 필터할 예정
          const titleAndNameArray = state.searchAttrs.map(element => element.title)
              .concat(state.searchAttrs.map(element => element.authorName));

          const filteredList = ChosungSearch.searchList(state.searchTerm, titleAndNameArray, true);

          state.ideaList = state.session.ideas.filter(idea => {
            // 인덱스 찾기
            let index = filteredList.findIndex(element => element === idea.title);
            if(index !== -1) {
              return true;
            }
            index = filteredList.findIndex(element => element === idea.author.name);
            return index !== -1;
          });
          return;
        }

        // 영어 검색어 입력 시
        const searchQuery = state.searchTerm.toLowerCase();
        state.ideaList = state.session.ideas.filter(idea => {
          if(idea.title.toLowerCase().includes(searchQuery)) return true;
          if(idea.author.name.toLowerCase().includes(searchQuery)) return true;
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

      [MUTATIONS.REMOVE_IDEAS_FROM_IDEA_LIST]: (state, ideas) => {
        state.ideaList = state.ideaList.filter(idea => {
          return ideas.findIndex(deletedIdea => idea.ideaId === deletedIdea.ideaId) === -1;
        })
      },

      [MUTATIONS.SET_IDEAS_SELECTED_TRUE]: (state, ideas) => {
        state.ideaList.forEach(function (idea) {
          ideas.forEach(function (selectedIdea) {
            if(idea.ideaId === selectedIdea.ideaId) {
              idea.selected = true;
            }
          })
        })
      },

      [MUTATIONS.REMOVE_CANDIDATE_IDEA]: (state, ideaId) => {
        const removeIdeaIndex = state.candidateIdeas.findIndex(idea => idea.id === ideaId);
        state.candidateIdeas.splice(removeIdeaIndex, 1);
      }
    },

    actions: {
        async [ACTIONS.LOAD_INIT_DATA] (context, {sessionNumber}) {
            const data = await getSession({sessionNumber: sessionNumber});
            context.commit(MUTATIONS.SET_INIT_DATA, data);
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
        [ACTIONS.FAVORITE_CHANGE](context, payload) {
          context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE, payload.ideaId);

          if(!payload.isFavorite) {
            setFavorite(payload.ideaId).catch(err => console.log(err));
            return;
          }
          deleteFavorite(payload.ideaId).catch(err => console.log(err));
        },

        [ACTIONS.SEARCH_TAGS](context) {
          // 서버로 전송
          // 받아온 리스트 ideaList에 저장
          context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE);
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
       * 아이디어/공지사항 수정
       * @param context
       * @param idea
       */
        [ACTIONS.MODIFY_IEDA](context, idea) {
            return modifyIdea(idea);
        },

        /**
         * 아이디어 상세 조회
         */
        [ACTIONS.GET_IDEA](context, ideaId) {
            return getIdea(ideaId);
        },

        [ACTIONS.DELETE_IDEAS]: (context, ideas) => {
          ideas.forEach(function (idea) {
            deleteIdea(idea.ideaId);
          })
          return context.commit(MUTATIONS.REMOVE_IDEAS_FROM_IDEA_LIST, ideas);
        },

        [ACTIONS.SELECTION_IDEAS]: (context, ideas) => {
            ideas.forEach(function (idea) {
              updateIdea(idea)
                // .then(this.$forceUpdate())
                .catch(err => console.log(err));
            });

          return context.commit(MUTATIONS.SET_IDEAS_SELECTED_TRUE, ideas);
        },

        [ACTIONS.SORT_BY_DEFAULT]: (context) => {
          context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER)
        },

        [ACTIONS.REMOVE_CANDIDATE_IDEA]: ({commit}, ideaId) => {
          return commit(MUTATIONS.REMOVE_CANDIDATE_IDEA, ideaId);
        },

        [ACTIONS.VOTE_SUMMIT]: (context) => {
          const candidateIdeas = context.state.candidateIdeas;
          candidateIdeas.forEach(idea => {
            putVoteIdea(idea.id)
                .then()
                .catch(err => Promise.reject(err));
          });
          return Promise.resolve(); //TODO 비동기처리 해줘야함. 모든 투표 정상완료되어야 resolve되도록!
        },

        [ACTIONS.GET_USER_SESSION_INFO]: (context) => {
          const     
        }
    }
};

export default store;