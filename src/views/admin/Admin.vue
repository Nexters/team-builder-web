<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px">
                <b-nav tabs align="center">
                    <b-nav-item @click="setAllUserManage" v-bind:active="selectedTab === allUserManage">전체회원관리</b-nav-item>
                    <b-nav-item @click="setActiveUserManage" v-bind:active="selectedTab === activeUserManage">활동회원관리</b-nav-item>
                    <b-nav-item @click="setActiveUser" v-bind:active="selectedTab === generalManage">일반관리</b-nav-item>
                </b-nav>
                <h2 v-if="!isDoneLoadPosts">Loading...</h2>
                <div v-else>
                    <div v-if="selectedTab === allUserManage">
                        <AllUserManage :users="users"/>
                    </div>
                    <div v-else-if="selectedTab === activeUserManage">
                        <ActiveUserManage :users="users"/>
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
    import AllUserManage from "../../components/admin/AllUserManage";
    import ActiveUserManage from "../../components/admin/ActiveUserManage";
    import GeneralManage from "../../components/admin/GeneralManage";
    import {ALL_USER_MANAGE, ACTIVE_USER_MANAGE, GENERAL_MANAGE} from "../../consts/adminType";
    import Layout from '@/components/common/layout/Layout';

    export default {
        name: "Admin",
        components: {Layout, AllUserManage, ActiveUserManage, GeneralManage},
        data() {
            return {
                allUserManage: ALL_USER_MANAGE,
                activeUserManage: ACTIVE_USER_MANAGE,
                generalManage: GENERAL_MANAGE,
                selectedTab: this.allUserManage,
                isDoneLoadPosts: false,
                users: []
            }
        },

        computed: {},

        methods: {
            setAllUserManage() {
                this.selectedTab = this.allUserManage
            },
            setActiveUserManage() {
                this.selectedTab = this.activeUserManage
            },
            setActiveUser() {
                this.selectedTab = this.generalManage
            }
        },

        created() {
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
