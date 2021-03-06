/**
 * store 에서 사용하는 GETTERS, MUTATIONS, ACTION
 *
 */
export const GETTERS = {
    POST_DETAIL: 'POST_DETAIL',
    GET_LIST: 'GET_LIST',
    LIST_LENGTH: 'LIST_LENGTH',
    GET_FAVORITE: 'GET_FAVORITE',
    GET_TAGS: 'GET_TAGS',
    SEARCH_TAG_LIST_LENGTH: 'SEARCH_TAG_LIST_LENGTH',
    GET_SEARCH_TAGS_FIRST_NAME: 'GET_SEARCH_TAGS_FIRST_NAME',
    GET_NOW_SESSION_NUMBER: 'GET_NOW_SESSION_NUMBER',
    GET_PERIOD_TYPE_NOW: 'GET_PERIOD_TYPE_NOW',
    SELECTED_IDEA_LIST_LENGTH: 'SELECTED_IDEA_LIST_LENGTH',
    GET_VOTED_IDEAS: 'GET_VOTED_IDEAS',

};

export const MUTATIONS = {
    CLEAR_MAIN: 'CLEAR_MAIN',
    SET_POSTS: 'SET_POSTS',
    SET_INIT_DATA: 'SET_INIT_DATA',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    FILTER_DATA: 'FILTER_DATA',
    SORT_LIST_BY_ORDER_NUMBER: 'SORT_LIST_BY_ORDER_NUMBER',
    SORT_LIST_BY_DATE_ASC: 'SORT_LIST_BY_DATE_ASC',
    SAVE_ORIGIN_LIST: 'SAVE_ORIGIN_LIST',
    SET_FAVORITE_LIST: 'SET_FAVORITE_LIST',
    SORT_LIST_BY_DATE_DESC: 'SORT_LIST_BY_DATE_DESC',
    SET_FAVORITE_OPPOSITE: 'SET_FAVORITE_OPPOSITE',
    SELECT_TAG: 'SELECT_TAG',
    SET_INIT_SELECTED_TAGS: 'SET_INIT_SELECTED_TAGS',
    ADD_CANDIDATE_IDEA: 'ADD_CANDIDATE_IDEA',
    SORT_LIST_BY_VOTE_NUMBER_DESC: 'SORT_LIST_BY_VOTE_NUMBER_DESC',
    REMOVE_IDEAS_FROM_IDEA_LIST: 'REMOVE_IDEAS_FROM_IDEA_LIST',
    SET_IDEAS_SELECTED_TRUE: 'SET_IDEAS_SELECTED_TRUE',
    REMOVE_CANDIDATE_IDEA: 'REMOVE_CANDIDATE_IDEA',
    CLEAR_CANDIDATE_IDEA: 'CLEAR_CANDIDATE_IDEA',
    FILTER_SELECTED_TAG: 'FILTER_SELECTED_TAG',
    SET_VOTED_IDEAS: 'SET_VOTED_IDEAS'
};

export const ACTIONS = {
    LOAD_POSTS: 'LOAD_POSTS',
    LOAD_INIT_DATA: 'LOAD_INIT_DATA',
    LOAD_ALL_USERS: 'LOAD_ALL_USERS',
    LOAD_ACTIVE_USERS: 'LOAD_ACTIVE_USERS',
    ENTER_SEARCH_TERM: 'ENTER_SEARCH_TERM',
    SHOW_ORIGIN_LIST: 'SHOW_ORIGIN_LIST',
    DATE_SORT_LIST: 'DATE_SORT_LIST',
    FAVORITE_CHANGE: 'FAVORITE_CHANGE',
    SEARCH_TAGS: 'SEARCH_TAGS',
    CREATE_NEW_IEDA: 'CREATE_NEW_IEDA',
    MODIFY_IEDA: 'MODIFY_IEDA',
    GET_IDEA: 'GET_IDEA',
    DELETE_IDEA: 'DELETE_IDEA',
    DELETE_IDEAS: 'DELETE_IDEAS',
    SELECTION_IDEAS: 'SELECTION_IDEAS',
    SORT_BY_DEFAULT: 'SORT_BY_DEFAULT',
    REMOVE_CANDIDATE_IDEA: 'REMOVE_CANDIDATE_IDEA',
    VOTE_SUMMIT: 'VOTE_SUMMIT',
    CREATE_SESSION: 'CREATE_SESSION',
    RELOAD_VOTED_IDEAS: 'RELOAD_VOTED_IDEAS',
    REMOVE_SESSION: 'REMOVE_SESSION',

    ADMIN_IDEAS_SELECT: 'ADMIN_IDEAS_SELECT'
};
