<template>
    <div>
        <h1>POSTS Example</h1>
        <h2 v-if="!isDoneLoadPosts">Loading...</h2>
        <div v-else v-for="post in posts">
            <span>{{post.id}}</span>
            <span>{{post.title}}</span>
            <span>{{post.body}}</span>
            <span>{{post.userId}}</span>
        </div>
    </div>
</template>

<script>
    import { GETTERS, ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    const { mapActions, mapGetters, mapState } = createNamespacedHelpers('example');


    export default {
        name: "Example",
        data() {
            return {
                isDoneLoadPosts: false,
            }
        },

        computed: {
            ...mapState({
                posts: state => state.posts,
            }),

        },

        methods: {
            ...mapActions({
                loadPosts: ACTIONS.LOAD_POSTS,
            }),

        },

        created() {
            this.loadPosts()
            .then(() => this.isDoneLoadPosts = true);
        }
    }
</script>

<style scoped>

</style>