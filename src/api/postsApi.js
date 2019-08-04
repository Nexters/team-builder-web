import api from './index';

export function getPosts() {
    return api.get('posts');
}