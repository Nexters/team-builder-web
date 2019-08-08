<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px">
                <b-nav tabs align="center">
                    <b-nav-item @click="setUserManage" v-bind:active="selectedTab === userManage">회원관리</b-nav-item>
                    <b-nav-item @click="setActiveUser" v-bind:active="selectedTab === generalManage">일반관리</b-nav-item>
                </b-nav>
                <h2 v-if="!isDoneLoadPosts">Loading...</h2>
                <div v-else>
                    <div v-if="selectedTab === userManage">
                        <UserManage :users="users"/>
                    </div>

                    <div v-else-if="selectedTab === generalManage">
                        <GeneralManage/>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import {getAllUsers} from "../../api/UserAPI";
    import UserManage from "../../components/admin/UserManage";
    import GeneralManage from "../../components/admin/GeneralManage";
    import {USER_MANAGE, GENERAL_MANAGE} from "../../consts/adminType";
    import Layout from '@/components/common/layout/Layout';

    export default {
        name: "Admin",
        components: {Layout, UserManage, GeneralManage},
        data() {
            return {
                userManage: USER_MANAGE,
                generalManage: GENERAL_MANAGE,
                selectedTab: this.userManage,
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
            setUserManage() {
                this.selectedTab = this.userManage
            },
            setActiveUser() {
                this.selectedTab = this.generalManage
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
        padding: 10px 0;
    }
</style>
