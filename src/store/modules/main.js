import {ACTIONS, GETTERS, MUTATIONS} from '@/store/types';
import {getSession, createSession, deleteSession} from '@/api/sessionApi';
import {
    createNewIdea,
    deleteFavorite,
    deleteIdea,
    getIdea,
    putVoteIdea,
    setFavorite,
    modifyIdea, selectIdea, adminIdeaSelect
} from '@/api/ideaApi';
import {DEFAULT_LOGO_URL} from '@/consts/common';

function initialState() {
    return {
        session: {
            id: 0,
            session: 0,
            period: '',
            headerImageUrl: '',
            tags: [ //전체 태그목록
                {
                    id: 0,
                    name: '',
                    type: ''
                }
            ],
            ideas: [
                {
                    ideaId: 1,
                    title: '',
                    content: '',
                    file: '',
                    selected: false,
                    type: 'IDEA', // IDEA or NOTICE
                    orderNumber: 0,
                    favorite: false,
                    tags: [ //해당 아이디어의 태그목록
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
                    createdAt: '',
                    updatedAt: ''
                }
            ],
            periods: [
                {
                    periodType: '',
                    now: true,
                    endDate: '',
                    startDate: '',
                },
            ],

            votedIdeas : [
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
                ideaId: 1,
                title: '',
                content: '',
                file: '',
                selected: false,
                type: 'IDEA', // IDEA or NOTICE
                orderNumber: 0,
                favorite: false,
                tags: [ //해당 아이디어의 태그목록
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
                createdAt: '',
                updatedAt: ''
            }
        ],
        nowPeriod: {},
    };
}

// 가독성을 위해 데이터 폼 표시
const store = {
    namespaced: true,
    state: initialState,

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
        },

        [GETTERS.GET_VOTED_IDEAS]: (state) => {
            return state.session.votedIdeas;
        }
    },

    mutations: {
        [MUTATIONS.CLEAR_MAIN](state) {
            const s = initialState();
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        },

        [MUTATIONS.SET_INIT_DATA](state, data) {
            const session = data.data;
            state.session = session;
            state.searchTerm = '';
            state.ideaList = session.ideas.sort((idea1, idea2) => {
                const idea1Type = idea1.type;
                const idea2Type = idea2.type;
                if (idea1Type > idea2Type) return -1;
                if (idea1Type < idea2Type) return 1;

                const periodCheck = session.periods.find(element => element.periodType === 'IDEA_CHECK').now;
                if (periodCheck) {
                    const idea1Selected = idea1.selected;
                    const idea2Selected = idea2.selected;
                    if (idea1Selected && !idea2Selected) return -1;
                    if (!idea1Selected && idea2Selected) return 1;
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
            state.selectedTags = [];
            state.nowPeriod = session.periods.find(period => period.now);
            state.maxVoteCount = session.maxVoteCount;
        },

        [MUTATIONS.SET_SEARCH_TERM]: (state, value) => {
            state.searchTerm = value;
        },

        [MUTATIONS.SORT_LIST_BY_ORDER_NUMBER]: (state) => {
            state.ideaList.sort((idea1, idea2) => {
                const idea1Type = idea1.type;
                const idea2Type = idea2.type;
                if (idea1Type > idea2Type) return -1;
                if (idea1Type < idea2Type) return 1;

                const idea1Selected = idea1.selected;
                const idea2Selected = idea2.selected;
                if (idea1Selected && !idea2Selected) return -1;
                if (!idea1Selected && idea2Selected) return 1;

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
                    if (index !== -1) {
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
                if (idea.title.toLowerCase().includes(searchQuery)) return true;
                if (idea.author.name.toLowerCase().includes(searchQuery)) return true;
            })
        },

        [MUTATIONS.SORT_LIST_BY_DATE_ASC](state) {
            state.ideaList = state.ideaList.sort((idea1, idea2) => {
                const idea1Type = idea1.type;
                const idea2Type = idea2.type;

                if (idea1Type > idea2Type) return -1;
                if (idea1Type < idea2Type) return 1;

                const idea1Selected = idea1.selected;
                const idea2Selected = idea2.selected;

                if (idea1Selected && !idea2Selected) return -1;
                if (!idea1Selected && idea2Selected) return 1;

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

        [MUTATIONS.SELECT_TAG]: (state, tags) => {
            state.selectedTags = tags;
            console.log(state.selectedTags);
        },

        [MUTATIONS.FILTER_SELECTED_TAG]: (state) => {
            state.ideaList = state.session.ideas.filter(idea => {

                return state.selectedTags.find(tag => {
                    return idea.tags.find(ideaTag => ideaTag.tagId === tag.tagId);
                })

            });
        },

        [MUTATIONS.SET_INIT_SELECTED_TAGS]: (state) => {
            state.selectedTags = [];
        },

        /**
         * 아이디어 투표할 때, 추가
         * @param state
         * @param id  idea.ideaId
         */
        [MUTATIONS.ADD_CANDIDATE_IDEA]: (state, id) => {
            // 선택 되지 않은 아이디어라면,
            const selectedIdea = state.ideaList.find(idea => (idea.ideaId === id));
            state.candidateIdeas.push({ideaId: id, title: selectedIdea.title});
        },

        [MUTATIONS.SORT_LIST_BY_VOTE_NUMBER_DESC]: (state) => {
            state.ideaList = state.ideaList.sort((idea1, idea2) => {
                const idea1Type = idea1.type;
                const idea2Type = idea2.type;
                if (idea1Type > idea2Type) return -1;
                if (idea1Type < idea2Type) return 1;
                return idea2.voteNumber === idea1.voteNumber ? idea2.orderNumber - idea1.orderNumber
                    : idea2.voteNumber - idea1.voteNumber;
            })
        },

        [MUTATIONS.REMOVE_IDEAS_FROM_IDEA_LIST]: (state, ideas) => {
            state.ideaList = state.ideaList.filter(idea => {
                return ideas.findIndex(deletedIdea => idea.ideaId === deletedIdea.ideaId) === -1;
            })
        },

        [MUTATIONS.SET_IDEAS_SELECTED_TRUE]: (state, {ideas, isSelected}) => {
            state.ideaList.forEach(function (idea) {
                ideas.forEach(function (selectedIdea) {
                    if (idea.ideaId === selectedIdea.ideaId) {
                        idea.selected = isSelected;
                    }
                })
            })
        },

        [MUTATIONS.REMOVE_CANDIDATE_IDEA]: (state, ideaId) => {
            const removeIdeaIndex = state.candidateIdeas.findIndex(idea => idea.ideaId === ideaId);
            state.candidateIdeas.splice(removeIdeaIndex, 1);
        },

        [MUTATIONS.CLEAR_CANDIDATE_IDEA]: (state) => {
            state.candidateIdeas = [];
        },

        [MUTATIONS.SET_VOTED_IDEAS]: (state, {votedIdeas}) => {
            state.session.votedIdeas = votedIdeas;
        }
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
        [ACTIONS.FAVORITE_CHANGE](context, payload) {
            if (!payload.isFavorite) {
                return setFavorite(payload.ideaId)
                    .then(() => {
                        context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE, payload.ideaId);
                        window.vm.$notify.info({
                            title: '즐겨찾기 추가',
                            message: '아이디어를 즐겨찾기에 추가했습니다.️',
                        });
                    });
            }

            return deleteFavorite(payload.ideaId)
                .then(() => {
                    context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE, payload.ideaId);
                    window.vm.$notify.info({
                        title: '즐겨찾기 해제',
                        message: '아이디어를 즐겨찾기에서 해제했습니다.',
                    });
                });
        },

        [ACTIONS.SEARCH_TAGS](context) {
            context.commit(MUTATIONS.FILTER_SELECTED_TAG)
                .then(() => context.commit(MUTATIONS.SET_FAVORITE_OPPOSITE));
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

        [ACTIONS.DELETE_IDEA]: (context, {idea}) => {
            return deleteIdea(idea.ideaId);
        },

        [ACTIONS.DELETE_IDEAS]: (context, ideas) => {
            ideas.forEach(function (idea) {
                deleteIdea(idea.ideaId);
            })
            return context.commit(MUTATIONS.REMOVE_IDEAS_FROM_IDEA_LIST, ideas);
        },

        [ACTIONS.SELECTION_IDEAS]: (context, {ideas, isSelected}) => {
            ideas.forEach(function (idea) {
                selectIdea(idea, isSelected)
                    .then(context.commit(MUTATIONS.SET_IDEAS_SELECTED_TRUE, {ideas, isSelected: isSelected}))
                    .catch(err => console.log(err));
            });
        },

        [ACTIONS.SORT_BY_DEFAULT]: (context) => {
            context.commit(MUTATIONS.SORT_LIST_BY_ORDER_NUMBER)
        },

        [ACTIONS.REMOVE_CANDIDATE_IDEA]: ({commit}, ideaId) => {
            return commit(MUTATIONS.REMOVE_CANDIDATE_IDEA, ideaId);
        },

        [ACTIONS.VOTE_SUMMIT]: (context) => {
            const candidateIdeas = context.state.candidateIdeas;
            const ideaIds = candidateIdeas.map(idea => idea.ideaId).join(',');
            return putVoteIdea({ideaIds})
                .then(context.commit(MUTATIONS.CLEAR_CANDIDATE_IDEA));
        },

        [ACTIONS.CREATE_SESSION]: context => {
            const newSessionData = {
                logoImageUrl: DEFAULT_LOGO_URL,
                maxVoteCount: 3
            };

            return createSession(newSessionData);
        },

        [ACTIONS.RELOAD_VOTED_IDEAS]: context => {
            return getSession({sessionNumber: context.state.session.sessionNumber})
                .then(data => {
                    const session = data.data;
                    context.commit(MUTATIONS.SET_VOTED_IDEAS, {votedIdeas: session.votedIdeas});
                });
        },

        [ACTIONS.REMOVE_SESSION]: (context, {sessionNumber}) => {
            return deleteSession({sessionNumber});
        },

        /**
         * 어드민 - 아이디어 선정
         * @param context
         * @param ideas
         * @returns {*}
         */
        [ACTIONS.ADMIN_IDEAS_SELECT]: (context, {ideas}) => {
            const ideaIds = ideas.map(idea => idea.ideaId);

            return adminIdeaSelect({ideaIds})
                .then(context.commit(MUTATIONS.SET_IDEAS_SELECTED_TRUE, {ideas, isSelected: true}))
                .catch(err => console.log(err));
        }
    }
};

export default store;
