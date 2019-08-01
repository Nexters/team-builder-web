<template>
    <div>
        <h1>POSTS Example</h1>
        <h2 v-if="!isDoneLoadPosts">Loading...</h2>
        <div v-else v-for="post in posts" :key="post.id" @click="onClickPost(post.id)">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{ post.title }}</span>
                </div>
                <div class="text item">
                    {{ post.body }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import { GETTERS, ACTIONS } from '@/store/types';
    import {NOTIFY_TYPE}  from '@/consts/notifIcationType';
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

            ...mapGetters({
                getPostDetail: GETTERS.POST_DETAIL,
            })

        },

        methods: {
            ...mapActions({
                loadPosts: ACTIONS.LOAD_POSTS,
            }),

            onClickPost(postId) {
                const post = this.getPostDetail(postId);
                this.$alert(post.body, post.title, {
                    confirmButtonText: 'OK',
                    callback: action => {
                        /**/
                    }
                });
            }
        },

        created() {
            this.loadPosts()
            .then(() => {
                this.$notify({
                   title: 'SUCCESS',
                   message: 'Load post success!!',
                   type: NOTIFY_TYPE.SUCCESS
                });
                this.isDoneLoadPosts = true;
            })
            .catch(err => {
                /*err 처리*/
            });
        }
    }
</script>

<style scoped>
    body {
        font-family: "Noto Sans";
    }

    .box-card {
        width: 70%;
        margin: 20px auto;
    }

    .clearfix {
        font-weight: bold;
    }
</style>