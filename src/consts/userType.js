export const LOGIN = 'login';
export const SIGNUP = 'signup';
export const SET_ID = 'setId';
export const SET_NAME = 'setName';
export const SET_ACTIVATED = 'setActivated';
export const SET_NEXTERS_NUMBER = 'setNextersNumber';
export const SET_ROLE = 'setRole';
export const SET_POSITION = 'setPosition';
export const SET_AUTH = 'setAuth';
export const SET_TOKEN = 'setToken';
export const SET_UUID = 'setUuid';

export const SET_EMAIL = 'setEmail';
export const SET_HAS_TEAM = 'setHasTeam';
export const SET_SUBMIT_IDEA = 'setSubmitIdea';
export const SET_VOTE_COUNT = 'setVoteCount';
export const SET_VOTED = 'setVoted';

export const LOGIN_URL =  process.env.VUE_APP_API_URL + '/users/sign-in';
export const SIGNUP_URL =  process.env.VUE_APP_API_URL + '/users/sign-up';
export const ID_DUPLICATE_CHECK_URL =  process.env.VUE_APP_API_URL + '/users/check-id';
export const GET_ME_INFO =  process.env.VUE_APP_API_URL + '/apis/me';

export const AUTH_CODE_URL = process.env.VUE_APP_API_URL + '/apis/commons';
export const ALL_USER_URL = process.env.VUE_APP_API_URL + '/apis/users';

export const ACTIVE_USER_URL = process.env.VUE_APP_API_URL + '/apis/users/{0}/activate';
export const DEACTIVE_USER_URL = process.env.VUE_APP_API_URL + '/apis/users/{0}/deactivate';
