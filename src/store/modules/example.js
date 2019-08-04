import {GETTERS, MUTATIONS, ACTIONS} from '@/store/types';
import {getPosts} from '@/api/postsApi';

const store = {
    namespaced: true,
    state: {
        posts: [{
            userId: 0,
            id: 0,
            title: '',
            body: ''
        }],
    },

    getters: {
        [GETTERS.POST_DETAIL](state) {
            return (postId) => state.posts.find(post => post.id === postId);
        }
    },

    mutations: {
        [MUTATIONS.SET_POSTS](state, data) {
            state.posts = data;
        }
    },

    actions: {
        [ACTIONS.LOAD_POSTS](context) {
            return getPosts()
            .then(data => context.commit(MUTATIONS.SET_POSTS, data));
        },
    }
};

export default store;