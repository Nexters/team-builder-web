<template>
    <Layout>
        <template v-slot:body>
            <div>
                <b-nav tabs align="center">
                    <b-nav-item @click="setAllUser" v-bind:active="selectedTab === 'allUser'">모든 기수</b-nav-item>
                    <b-nav-item @click="setActiveUser" v-bind:active="selectedTab === 'activeUser'">현재 기수</b-nav-item>
                </b-nav>
                <h2 v-if="!isDoneLoadPosts">Loading...</h2>
                <div v-else>
                    <div v-if="selectedTab === 'allUser'">
                        <AllUser :users="users"/>
                    </div>

                    <div v-else-if="selectedTab === 'activeUser'" v-for="user in users" :key="user.id">
                        <ActiveUser/>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import {getAllUsers} from "../../api/UserAPI";
    import AllUser from "../../components/admin/AllUser";
    import ActiveUser from "../../components/admin/ActiveUser";
    import Layout from '@/components/common/layout/Layout';

    export default {
        name: "Admin",
        components: {Layout, ActiveUser, AllUser},
        data() {
            return {
                selectedTab: 'allUser',
                isDoneLoadPosts: false,
                users: []
            }
        },

        computed: {},

        methods: {
            loadAllUsers() {
                getAllUsers()
                    .then(res => {
                        this.users = res.data;
                        this.isDoneLoadPosts = true;
                    })
                    .catch(err => {
                        /*err 처리*/
                    });
            },
            setAllUser() {
                this.selectedTab = 'allUser'
            },
            setActiveUser() {
                this.selectedTab = 'activeUser'
            }
        },

        created() {
            this.loadAllUsers();
            this.isDoneLoadPosts = true
        }
    }
</script>

<style scoped>
    body {
        font-family: "Noto Sans";
    }
    .el-card__body {
        padding: 10px 0 ;
    }
</style>
