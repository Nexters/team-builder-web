<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px">
                <b-nav tabs align="center">
                    <b-nav-item @click="setUserManage" v-bind:active="selectedTab === allUserManage">회원관리</b-nav-item>
                    <b-nav-item @click="setActiveUser" v-bind:active="selectedTab === generalManage">일반관리</b-nav-item>
                </b-nav>
                <h2 v-if="!isDoneLoadPosts">Loading...</h2>
                <div v-else>
                    <div v-if="selectedTab === allUserManage">
                        <AllUserManage :users="users"/>
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
    import AllUserManage from "../../components/admin/AllUserManage";
    import GeneralManage from "../../components/admin/GeneralManage";
    import {ALL_USER_MANAGE, GENERAL_MANAGE} from "../../consts/adminType";
    import Layout from '@/components/common/layout/Layout';

    export default {
        name: "Admin",
        components: {Layout, AllUserManage, GeneralManage},
        data() {
            return {
                allUserManage: ALL_USER_MANAGE,
                generalManage: GENERAL_MANAGE,
                selectedTab: this.allUserManage,
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
                this.selectedTab = this.allUserManage
            },
            setActiveUser() {
                this.selectedTab = this.generalManage
            }
        },

        created() {
            this.loadAllUsers();
            this.isDoneLoadPosts = true
            this.selectedTab = this.allUserManage
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
