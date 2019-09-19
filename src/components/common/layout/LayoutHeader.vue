<template>
    <div class="layout-header">
        <div class="header-contents-wrap">
            <div style="width: 700px; display: flex;">
                <div class="contents-mode">
                    <button @click="moveToSession" class="mode-idea" :class="{'on': mode === 'IDEA'}">아이디어</button>
                    <div v-show="mode === 'IDEA'" class="mode-idea-bar"></div>
                </div>
                <div class="contents-mode">
                    <div @click="moveToTeamBuilding" style="position: relative; margin-right: 100%">
                        <button class="mode-team-building" :class="{'on': mode === 'TEAMBUILDING'}">팀빌딩</button>
                        <img v-show="isTeambuildingPeriod" class="mode-team-building-padlock" src="@/assets/img/header-padlock-icon.png"/>
                    </div>
                    <div v-show="mode === 'TEAMBUILDING'" class="mode-team-building-bar"></div>
                </div>

                <template v-if="isAdmin">
                    <div class="mode-team-admin-bar"></div>
                    <div class="contents-mode">
                        <button @click="moveToUserManage" class="mode-user-manage" :class="{'on': mode === USER_MANAGE}">회원관리</button>
                        <div v-show="mode === USER_MANAGE" class="mode-team-building-bar" style="width: 63px"></div>
                    </div>

                    <div class="contents-mode" style="margin-left: 48.5px; margin-right: 100%">
                        <button @click="moveToGeneralManage" class="mode-general-manage" :class="{'on': mode === GENERAL_MANAGE}">일반관리</button>
                        <div v-show="mode === GENERAL_MANAGE" class="mode-team-building-bar" style="width: 63px"></div>
                    </div>
                </template>
            </div>

            <div class="header-period" :class="{'now' : nowPeriodType === 'IDEA_COLLECT'}" @mouseover="!this.showIdeaCollect">
                <div class="period-step" :class="{'period-step-on' : nowPeriodType === 'IDEA_COLLECT'}">step1</div>
                <span v-show="!this.showIdeaCollect">아이디어 모집</span>
                <span v-show="this.showIdeaCollect">{{ }}</span>
            </div>
            <img class="period-right-icon" src="@/assets/img/header-right-icon.png"/>
            <div class="header-period" :class="{'now' : nowPeriodType === 'IDEA_VOTE'}" @mouseover="!this.showIdeaVote">
                <div class="period-step" :class="{'period-step-on' : nowPeriodType === 'IDEA_VOTE'}">step2</div>
                <span v-show="!this.showIdeaVote">아이디어 투표</span>
                <span v-show="this.showIdeaVote">{{ }}</span>
            </div>
            <img class="period-right-icon" src="@/assets/img/header-right-icon.png"/>
            <div class="header-period" :class="{'now' : nowPeriodType === 'IDEA_CHECK'}" @mouseover="!this.showIdeaCheck">
                <div class="period-step" :class="{'period-step-on' : nowPeriodType === 'IDEA_CHECK'}">step3</div>
                <span v-show="!this.showIdeaCheck">선정아이디어 확인</span>
                <span v-show="this.showIdeaCheck">{{ }}</span>
            </div>
            <img class="period-right-icon" src="@/assets/img/header-right-icon.png"/>
            <div class="header-period" :class="{'now' : nowPeriodType === 'TEAM_BUILDING'}" @mouseover="!this.showTeamBuilding">
                <div class="period-step" :class="{'period-step-on' : nowPeriodType === 'TEAM_BUILDING'}">step4</div>
                <span v-show="!this.showTeamBuilding">팀빌딩</span>
                <span v-show="this.showTeamBuilding">{{ }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {GENERAL_MANAGE, USER_MANAGE} from '@/consts/adminType';
    import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');


    export default {
        name: "LayoutHeader",
        data() {
            return {
                mode: 'IDEA',
                // mode: 'TEAMBUILDING',
                // mode: USER_MANAGE,
                // mode: GENERAL_MANAGE,
                USER_MANAGE: USER_MANAGE,
                GENERAL_MANAGE: GENERAL_MANAGE,
                showIdeaCollect: false,
                showIdeaVote: false,
                showIdeaCheck: false,
                showTeamBuilding: false,



                isTeambuildingPeriod: false, //팀빌딩 모드 전환이 가능한지 여부! padlock img 노출용
            }
        },

        computed: {
            isAdmin() {
                return this.$store.getters.isAdmin;
            },
            sessionNumber() {
                return this.$store.state.main.session.sessionNumber || this.$route.params.sessionNumber;
            },

          // ...mapState({
          //   nowPeriodType: state => state.session.nowPeriod,
          // }),

          ...mapGetters({
            nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW
          })
        },

        methods: {
            moveToSession() {
                this.$router.push({path: `/session/${this.sessionNumber}`});
            },
            moveToTeamBuilding() {
                // 오픈준비중
                // this.$router.push({path: `/session/${this.$route.params.sessionNumber}/teambuilding`});
                this.$alert('오픈 준비중입니다.', '팀빌딩', {
                        confirmButtonText: '확인'
                    }
                )
            },
            moveToUserManage() {
                this.$router.push({path: `/session/${this.sessionNumber}/user-manage`});
            },
            moveToGeneralManage() {
                this.$router.push({path: `/session/${this.sessionNumber}/general-manage`});
            }
        }
    }
</script>

<style scoped>
    .layout-header {
        margin-left: 70px;
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0px;
        left: -35px;
        background-color: white;
        z-index: 98;
    }

    .header-contents-wrap {
        min-width: 1200px;
        height: 70px;
        display: flex;
    }

    .contents-mode {
        width: 110px;
        height: 72px;
        margin-right: 20px;
        color: #9b9b9b;
    }

    .mode-idea {
        width: 63px;
        height: 27px;
        margin: 26px 47px 17px 0px;
        font-family: NotoSansCJKkr;
        color: #9b9b9b;
        font-size: 18px;
        letter-spacing: -1px;
    }

    .mode-team-building {
        width: 47px;
        height: 27px;
        margin: 26px 6px 17px 0px;
        font-family: NotoSansCJKkr;
        color: #9b9b9b;
        font-size: 18px;
        letter-spacing: -1px;
        display: inline-block;
    }

    .on {
        font-weight: bold;
        color: #273ea5!important;
    }

    .mode-team-building-padlock {
        width: 12px;
        height: 15px;
        position: fixed;
        top: 33px;
        margin-bottom: 5px;
        margin-right: 45px;
        object-fit: contain;
    }

    .mode-idea-bar {
        width: 63px;
        height: 2px;
        background-color: #273ea5;
    }

    .mode-team-building-bar {
        width: 47px;
        height: 2px;
        background-color: #273ea5;
    }

    .mode-team-admin-bar {
        width: 3px; /*2px은 노출이 안*/
        height: 18px;
        background-color: #d8d8d8;
        margin: 30.5px 32.5px 23.5px 50px;
    }

    .mode-user-manage {
        width: 63px;
        height: 27px;
        margin: 26px 6px 17px 0px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -1px;
        color: #9b9b9b;
    }

    .mode-general-manage {
        width: 63px;
        height: 27px;
        margin: 26px 6px 17px 0px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -1px;
        color: #9b9b9b;
    }

    .header-period {
        margin: 30px 0px 18px 0px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -0.6px;
        color: #898989;
        position: relative;
    }

    .now {
        color: #000000;
    }

    .period-right-icon {
        width: 15px;
        height: 14px;
        object-fit: contain;
        margin: 36px 16px 22px 16px;
    }

    .period-step {
        width: 29px;
        height: 14px;
        position: absolute;
        top: -15px;
        left: -2px;
        font-family: Roboto;
        font-size: 12px;
        font-weight: 300;
        font-style: italic;
        color: #9b9b9b;
    }

    .period-step-on {
        color: #208b84;
    }

</style>