export const LOGIN = 'login';
export const SIGNUP = 'signup';
export const SET_ID = 'setId';
export const SET_NAME = 'setName';
export const SET_NEXTERS_NUMBER = 'setNextersNumber';
export const SET_ROLE = 'setRole';
export const SET_POSITION = 'setPosition';
export const SET_AUTH = 'setAuth';
export const SET_TOKEN = 'setToken';

export const LOGIN_URL =  process.env.VUE_APP_API_URL + '/users/sign-in';
export const SIGNUP_URL =  process.env.VUE_APP_API_URL + '/users/sign-up';
export const GET_ME_INFO =  process.env.VUE_APP_API_URL + '/apis/me';

export const ALL_USER_URL = process.env.VUE_APP_API_URL + '/apis/users';
export const ACTIVE_USER_URL = process.env.VUE_APP_API_URL_TEST + '/users';

export const UPLOAD_LOGO_URL = process.env.VUE_APP_API_URL + '/files/upload';
