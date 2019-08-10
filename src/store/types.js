/**
 * store 에서 사용하는 GETTERS, MUTATIONS, ACTION
 *
 */
export const GETTERS = {
    POST_DETAIL: 'POST_DETAIL',
    SHOW_LIST: 'SHOW_LIST',
    LIST_LENGTH: 'LIST_LENGTH',
    GET_TITLES: 'GET_TITLES',
    GET_SEARCH_TERM: 'GET_SEARCH_TERM'
};

export const MUTATIONS = {
    SET_POSTS: 'SET_POSTS',
    SET_INIT_DATA: 'SET_INIT_DATA',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    FILTER_DATA: 'FILTER_DATA',
};

export const ACTIONS = {
    LOAD_POSTS: 'LOAD_POSTS',
    LOAD_INIT_DATA: 'LOAD_INIT_DATA',
    LOAD_ALL_USERS: 'LOAD_ALL_USERS',
    LOAD_ACTIVE_USERS: 'LOAD_ACTIVE_USERS',
    ENTER_SEARCH_TERM: 'ENTER_SEARCH_TERM',

};
