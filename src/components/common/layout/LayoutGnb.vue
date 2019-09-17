<template>
    <div>
        <div class="layout-gnb">
            <button class="gnb-logo-wrap" @click="onClickLogo">
                <div class="gnb-logo-image">
                    <img style="width: 48px; height: 48px;padding: 7px;" :src="logoImageUrl"/>
                </div>
            </button>
            <button @click="openSessionGroup" class="gnb-session-wrap">
                <span class="gnb-session">
                    {{ sessionNumber }}
                </span>
                <img v-show="!isOpenSessionGroup" class="gnb-session-open-icon" src="@/assets/img/gnb_open_icon.png" />
                <img v-show="isOpenSessionGroup" class="gnb-session-open-icon" src="@/assets/img/gnb_close_icon.png" />
            </button>

            <button v-if="isAdmin" @click="onClickAllUserManage" class="gnb-all-user-manage btn-gnb-bottom">
                <img class="gnb-all-user-manage-img" src="@/assets/img/gnb_all_user_manage_icon.png" />
            </button>

            <button @click="onClickMyPage" class="gnb-my-page btn-gnb-bottom">
                <span class="gnb-my-page-name">
                    {{ userLastName }}
                </span>
            </button>

            <button @click="onClickLogout" class="gnb-logout btn-gnb-bottom">
                <img class="gnb-logout-img" src="@/assets/img/gnb_logout_icon.png" />
            </button>
        </div>
        <SlideXLeftTransition :duration="500">
            <div v-show="isOpenSessionGroup" class="layout-session-group" style="margin-top: 72px; padding-top: 7px">
                <button @click="moveSession(sessionNumber)" v-for="sessionNumber in sessionNumbers" class="layout-session-group-one" :class="nowSessionClass(sessionNumber)">
                    {{ sessionNumber }}
                </button>
            </div>
        </SlideXLeftTransition>

    </div>
</template>

<script>
    import {SlideXLeftTransition} from 'vue2-transitions';
    import {DEFAULT_LOGO_URL} from '@/consts/common';

    export default {
        name: "LayoutGnb",
        components: {SlideXLeftTransition},
        data() {
            return {
                isOpenSessionGroup: false,
            }
        },

        computed: {
            logoImageUrl() {
                const logoImageUrl = this.$store.state.main.session.logoImageUrl;
                return logoImageUrl !== 'https:image.url' ? logoImageUrl : DEFAULT_LOGO_URL;
            },

            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            sessionNumber() {
                return this.$store.state.main.session.sessionNumber;
            },

            sessionNumbers() {
                return this.$store.state.main.session.sessionNumbers.map(session => session.sessionNumber).sort((a, b) => b - a);
            },

            userLastName() {
                return this.$store.state.auth.name.slice(0, 1);
            }

        },

        methods: {
            onClickLogo() {
                this.$router.push({path: `/session/${this.sessionNumber}`});
            },
            openSessionGroup() {
                this.isOpenSessionGroup = !this.isOpenSessionGroup;
            },
            moveSession(sessionNumber) {
                this.isOpenSessionGroup = false;
                window.location.href = `/session/${sessionNumber}`;
            },
            onClickMyPage() {
                this.$router.push({path: '/info'});
            },
            onClickAllUserManage() {
                this.$router.push({path: '/all-user-manager'});
            },
            nowSessionClass(sessionNumber) {
                if (this.sessionNumber === sessionNumber) {
                    return 'now-session';
                }
                return '';
            },
            onClickLogout() {
                sessionStorage.clear();
                this.$router.push({path: '/login'});
            }
        },

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

    .layout-session-group-one:hover {
        color: #ffffff;
    }

    .gnb-logout-img {
        width: 21px;
        height: 22px;
        object-fit: contain;
    }

    .now-session {
        color: #ffffff;
    }

    .btn-gnb-bottom:hover {
        background-color: #354ec1;
    }
</style>