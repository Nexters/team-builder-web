<template>
    <div class="session-info-wrap">
        <div class="session-info-main">
            <div class="session-info-title">
                <span>넥스터즈 {{sessionNumber}}기의<br>{{ mainTitle }}</span>
            </div>
            <SessionInfoDDay></SessionInfoDDay>

            <div class="session-info-idea-write-wrap">
                <button class="session-info-idea-write-button" @click="moveNewIdea">
                    <span class="session-info-idea-write-message">{{ ideaWriteText }}</span>
                </button>
            </div>
        </div>

        <div class="session-info-image-wrap">
            <img class="session-info-image" src="@/assets/img/session_ingo_idea_collect_image.png"/>
        </div>

        <SlideYUpTransition :duration="600">
            <div v-show="scroll > 265 && !isAdmin" class="session-info-mini-wrap">
                <div class="mini-title">
                    <span>넥스터즈 {{sessionNumber}}기의 {{ mainTitle }}</span>
                </div>
                <SessionInfoDDay style="margin-top: 30px"></SessionInfoDDay>

                <div class="session-info-idea-write-wrap" style="margin-left: 65px; margin-top: 17px;">
                    <button class="session-info-idea-write-button-mini" @click="moveNewIdea">
                        <span class="session-info-idea-write-message-mini">{{ ideaWriteText }}</span>
                    </button>
                </div>
            </div>
        </SlideYUpTransition>
    </div>
</template>

<script>
    import SessionInfoDDay from '@/components/common/sessionInfo/SessionInfoDDay';
    import {SlideYUpTransition} from 'vue2-transitions';
    import {PERIOD_TYPE} from '@/consts/periodType';
    import moment from 'moment';

    export default {
        name: "SessionInfoIdeaCollect",
        components: {SessionInfoDDay, SlideYUpTransition},
        data() {
            return {
                sessionNumber: this.$store.state.main.session.sessionNumber,
                nowPeriodType: this.$store.state.main.nowPeriod.periodType,
                ideaWriteText: this.$store.getters.isAdmin ? '공지 작성하기' : '아이디어 작성하기',
                scroll: 0,
            }
        },

        computed: {
            mainTitle() {
                return '다양한 아이디어를 모집해요';
            },

            isAdmin() {
                return this.$store.getters.isAdmin;
            },
        },

        methods: {
            moveNewIdea() {
                if (this.isAdmin) {
                    this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/new`});
                    return;
                }

                if (!this.$store.state.auth.activated) {
                    this.$store.commit('common/showAlert', {alertMessage: '해당 기수에 대한 권한이 없어요.\n운영진에게 해당 기수에 추가 요청하세요.'});
                    return;
                }

                const ideaCollectStartDate = this.$store.state.main.session.periods.find(period => period.periodType === PERIOD_TYPE.IDEA_COLLECT).startDate;
                if (moment().isBefore(moment(ideaCollectStartDate))) {
                    this.$store.commit('common/showAlert', {alertMessage: '아이디어 모집 기간 이전입니다.'});
                    return;
                }

                this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/new`});
            },

            onScroll(event) {
                this.scroll = window.scrollY;
            },
        },

        created () {
            window.addEventListener('scroll', this.onScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.onScroll);
        }
    }
</script>

<style scoped>
    .session-info-wrap {
        min-width: 1200px;
        margin-left: 70px;
        height: 400px;
        background-color: white;
        display: flex;
    }

    .session-info-main {
        width: 578px;
        height: 100%;
    }

    .session-info-title {
        text-align: left;
        margin: 67px 0px 16px 0px;
        width: 100%;
        height: 118px;
        font-family: NotoSansCJKkr;
        line-height: normal;
        font-size: 40px;
        font-weight: 300;
        letter-spacing: -3px;
        color: #000000;
    }

    .session-info-idea-write-wrap {
        text-align: left;
        margin-top: 39px;
    }

    .session-info-idea-write-button {
        width: 240px;
        height: 64px;
        border-style: none;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .session-info-idea-write-message {
        width: 158px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .session-info-image-wrap {
        width: 560px;
        height: 100%;
        margin-left: 61px;
    }

    .session-info-image {
        width: 381.4px;
        height: 306px;
        margin: 41px 60.8px 52px 117.8px;
    }

    .session-info-mini-wrap {
        position: fixed;
        top: 72px;
        width: 100%;
        height: 90px;
        z-index: 99;
        background-color: white;
        display: flex;
    }

    .mini-title {
        width: 409px;
        height: 36px;
        font-family: NotoSansCJKkr;
        font-size: 24px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -1.5px;
        color: #000000;
        margin: 25px 40px 0 0;
    }

    .session-info-idea-write-button-mini {
        width: 200px;
        height: 57px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .session-info-idea-write-message-mini {
        width: 130px;
        height: 27px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }

</style>
