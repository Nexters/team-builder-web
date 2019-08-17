<template>
    <div>
        <div class="layout-gnb">
            <button class="gnb-logo-wrap" @click="onClickLogo">
                <div class="gnb-logo-image">
                    <img style="width: 48px; height: 48px;" src="@/assets/img/nexters_15th_logo.png"/>
                </div>
            </button>
            <button @click="openSessionGroup" class="gnb-session-wrap">
                <span class="gnb-session">
                    {{ sessionNo }}
                </span>
                <img v-show="!isOpenSessionGroup" class="gnb-session-open-icon" src="@/assets/img/gnb_open_icon.png" />
                <img v-show="isOpenSessionGroup" class="gnb-session-open-icon" src="@/assets/img/gnb_close_icon.png" />
            </button>

            <button v-if="isAdmin" @click="onClickAllUserManage" class="gnb-all-user-manage">
                <img class="gnb-all-user-manage-img" src="@/assets/img/gnb_all_user_manage_icon.png" />
            </button>

            <button @click="onClickMyPage" class="gnb-my-page">
                <span class="gnb-my-page-name">
                    {{ userLastName }}
                </span>
            </button>

            <button @click="onClickMyPage" class="gnb-logout">
                <span class="gnb-my-page-name">
                    로
                </span>
            </button>
        </div>
        <div v-show="isOpenSessionGroup" class="layout-session-group" style="margin-top: 72px; padding-top: 7px">
            <button @click="moveSession(sessionNo)" v-for="sessionNo in sessions" class="layout-session-group-one" :class="nowSessionClass(sessionNo)">
                {{ sessionNo }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutGnb",
        data() {
            return {
                isOpenSessionGroup: false,
                userLastName: '허',
                sessionNo: 16,
                sessions: [
                    16, 15, 14, 13, 12, 11
                ],
                isAdmin: true, //TODO: 기본 false
            }
        },

        computed: {

        },

        methods: {
            onClickLogo() {
                this.$router.push({path: `/`});
            },
            openSessionGroup() {
                this.isOpenSessionGroup = !this.isOpenSessionGroup;
            },
            moveSession(sessionNo) {
                this.isOpenSessionGroup = false;
                this.$router.push({path: `/session/${sessionNo}`});
            },
            onClickMyPage() {
                this.$router.push({path: '/info'});
            },
            onClickAllUserManage() {
                this.$router.push({path: '/all-user-manager'});
            },
            nowSessionClass(sessionNo) {
                if (this.sessionNo === sessionNo) {
                    return 'now-session';
                }
                return '';
            },
        }
    }
</script>

<style scoped>
    .layout-gnb {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 70px;
        height: 100%;
        background-color: #273ea5;
        display: flex;
        flex-direction: column;
        z-index: 99;
    }

    .gnb-logo-wrap {
        height: 72px;
        background-color: white;
    }

    .gnb-logo-image {
        margin: 11px 10px;
        width: 48px;
        height: 51px;
        border-radius: 10px;
    }

    .gnb-session-wrap {
        height: 70px;
        background-color: #192f93;
        position: relative;
    }

    .gnb-session {
        margin: 23px 31px 23px 18px;
        width: 21px;
        font-family: Roboto;
        font-size: 20px;
        font-weight: 300;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .gnb-session-open-icon {
        position: absolute;
        right: 20px;
        top: 30px;
        height: 12px;
        object-fit: contain;
    }

    .gnb-my-page {
        position: absolute;
        width: 44px;
        height: 44px;
        bottom: 82px;
        left: 13px;
        border-radius: 6px;
        background-color: #4c64cf;
    }

    .gnb-my-page-name  {
        width: 18px;
        height: 29px;
        margin: 8px 13px 7px 13px;
        font-size: 20px;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .gnb-logout {
        position: absolute;
        width: 44px;
        height: 44px;
        bottom: 22px;
        left: 13px;
        border-radius: 6px;
        background-color: #4c64cf;
    }

    .gnb-all-user-manage {
        position: absolute;
        width: 44px;
        height: 44px;
        bottom: 142px;
        left: 13px;
        border-radius: 6px;
        background-color: #4c64cf;
    }

    .gnb-all-user-manage-img {
        width: 22px;
        height: 22px;
        object-fit: contain;
    }

    .layout-session-group {
        position: fixed;
        top: 0px;
        left: 70px;
        width: 100px;
        height: 100%;
        background-color: #192f93;
        display: flex;
        flex-direction: column;
        z-index: 99;
    }

    .layout-session-group-one {
        width: 21px;
        height: 40px;
        font-family: Roboto;
        font-size: 20px;
        font-weight: 300;
        line-height: 2;
        letter-spacing: -1px;
        color: #93a3ea;
        margin: 8px 40px 8px 39px;
    }

    .now-session {
        color: #ffffff;
    }
</style>