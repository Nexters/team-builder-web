<template>
    <div class="session-info-wrap">
        <div class="session-info-main">
            <div class="session-info-title">
                <span>넥스터즈 {{sessionNumber}}기의<br>{{ mainTitle }}</span>
            </div>

            <SessionInfoDDay></SessionInfoDDay>

            <div v-if="!isAdmin">
                <div class="session-info-idea-put-basket-box">
                    <div v-show="!voteDone" style="width: 200px">
                        <span class="session-info-idea-put-basket">아이디어 투표 담기</span>
                        <span class="session-info-idea-put-basket-count">{{ candidateIdeas.length }} / {{ maxVoteCount }}</span>
                    </div>
                    <span v-show="voteDone" class="session-info-idea-put-basket">투표내역</span>
                </div>

                <div v-show="!voteDone && !isAvailableVote" class="session-info-idea-vote-info-message-box">
                    <span class="session-info-idea-vote-info-message">아이디어 목록 오른쪽에 있는 </span>
                    <img class="session-info-idea-vote-info-message-plus-icon" src="@/assets/img/session-info-vote-plus-icon.png"/>
                    <span class="session-info-idea-vote-info-message"> 플러스 아이콘을 눌러 아이디어를 담고 투표를 확정해주세요.</span>
                </div>

                <div v-show="!voteDone && isAvailableVote" class="session-info-idea-vote-candidateIdeas-wrap">
                    <div v-for="idea in candidateIdeas" class="session-info-idea-vote-candidateIdeas-box">
                        <span class="session-info-idea-vote-candidateIdeas-text">{{ idea.title }}</span>
                        <button @click="removeCandidateIdea(idea.ideaId)" class="session-info-idea-vote-candidateIdeas-idea-remove-button">
                            <img class="session-info-idea-vote-candidateIdeas-idea-remove" src="@/assets/img/session-info-idea-vote-candidateIdeas-idea-remove-icon.png"/>
                        </button>
                    </div>
                </div>

                <!-- 투표완료한 경우 -->
                <div v-show="voteDone" class="session-info-idea-vote-candidateIdeas-wrap">
                    <div v-for="idea in votedIdeas" class="session-info-idea-vote-candidateIdeas-box">
                        <span class="session-info-idea-vote-candidateIdeas-text" :style="voteDoneStyle">{{ idea.title }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="session-info-idea-vote-image-wrap">
            <div class="session-info-idea-vote-image-box">
                <img class="session-info-idea-vote-image" src="@/assets/img/session_ingo_idea_vote_image.png"/>
            </div>
            <div v-show="!isAdmin && !voteDone" class="session-info-idea-vote-button-box">
                <button @click="voteSummit()" class="session-info-idea-vote-button" :class="availableVoteButtonClass" :disabled="!isAvailableVote">
                    <span class="session-info-idea-vote-button-text" :class="availableVoteButtonTextClass">아이디어 투표하기</span>
                </button>
            </div>
        </div>

        <SlideYUpTransition :duration="600">
            <div v-show="scroll > 265 && !isAdmin" class="session-info-mini-wrap">
                <div v-if="!isAdmin">
                    <div class="session-info-idea-put-basket-box" style="margin-top: 15px;">
                        <div v-show="!voteDone" style="width: 200px">
                            <span class="session-info-idea-put-basket">아이디어 투표 담기</span>
                            <span class="session-info-idea-put-basket-count">{{ candidateIdeas.length }} / {{ maxVoteCount }}</span>
                        </div>
                        <span v-show="voteDone" class="session-info-idea-put-basket">투표내역</span>
                    </div>

                    <div v-show="!voteDone && !isAvailableVote" class="session-info-idea-vote-info-message-box">
                        <span class="session-info-idea-vote-info-message">아이디어 목록 오른쪽에 있는 </span>
                        <img class="session-info-idea-vote-info-message-plus-icon" src="@/assets/img/session-info-vote-plus-icon.png"/>
                        <span class="session-info-idea-vote-info-message"> 플러스 아이콘을 눌러 아이디어를 담고 투표를 확정해주세요.</span>
                    </div>

                    <div v-show="!voteDone && isAvailableVote" class="session-info-idea-vote-candidateIdeas-wrap">
                        <div v-for="idea in candidateIdeas" class="session-info-idea-vote-candidateIdeas-box">
                            <span class="session-info-idea-vote-candidateIdeas-text">{{ idea.title }}</span>
                            <button @click="removeCandidateIdea(idea.ideaId)" class="session-info-idea-vote-candidateIdeas-idea-remove-button">
                                <img class="session-info-idea-vote-candidateIdeas-idea-remove" src="@/assets/img/session-info-idea-vote-candidateIdeas-idea-remove-icon.png"/>
                            </button>
                        </div>
                    </div>

                    <!-- 투표완료한 경우 -->
                    <div v-show="voteDone" class="session-info-idea-vote-candidateIdeas-wrap">
                        <div v-for="idea in votedIdeas" class="session-info-idea-vote-candidateIdeas-box">
                            <span class="session-info-idea-vote-candidateIdeas-text" :style="voteDoneStyle">{{ idea.title }}</span>
                        </div>
                    </div>
                </div>

                <div class="session-info-idea-vote-image-wrap">
                    <div v-show="!isAdmin && !voteDone" class="session-info-idea-vote-button-box" :class="availableVoteButtonBoxClass" style="bottom: -12px; right: -809px;">
                        <button @click="voteSummit()" class="session-info-idea-vote-button" :class="availableVoteButtonClass" :disabled="!isAvailableVote" style="bottom: 30px">
                            <span class="session-info-idea-vote-button-text" :class="availableVoteButtonTextClass">아이디어 투표하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </SlideYUpTransition>
    </div>
</template>

<script>
    import {SlideYUpTransition} from 'vue2-transitions';
    import SessionInfoDDay from '@/components/common/sessionInfo/SessionInfoDDay';
    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    import {RELOAD_AUTH} from '@/consts/userType';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "SessionInfoIdeaVote",
        components: {SessionInfoDDay, SlideYUpTransition},
        data() {
            return {
                sessionNumber: this.$store.state.main.session.sessionNumber,
                scroll: 0,
            }
        },

        computed: {
            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            voteDone() {
                return this.$store.state.auth.voted;
            },

            votedIdeas() {
                return this.$store.state.main.session.votedIdeas;
            },

            mainTitle() {
                return '아이디어를 투표해요';
            },

            isAvailableVote() {
                return this.candidateIdeas.length > 0;
            },

            availableVoteButtonBoxClass() {
                if (this.isAvailableVote) {
                    return 'available-vote-button-box';
                }
                return '';
            },

            availableVoteButtonClass() {
                if (this.isAvailableVote) {
                    return 'available-vote-button';
                }
                return '';
            },

            availableVoteButtonTextClass() {
                if (this.isAvailableVote) {
                    return 'available-vote-button-text';
                }
                return '';
            },

            candidateIdeas() {
                return this.$store.state.main.candidateIdeas;
            },

            maxVoteCount() {
                return this.$store.state.main.session.maxVoteCount;
            },

            voteDoneStyle() {
                return this.voteDone ? {maxWidth: '230px'} : {};
            }
        },

       methods: {
            ...mapActions({
                removeCandidateIdeaAction: ACTIONS.REMOVE_CANDIDATE_IDEA,
                voteSummitAction: ACTIONS.VOTE_SUMMIT,
            }),

            voteSummit() {
                if (!this.$store.state.auth.activated) {
                    this.$store.commit('common/showAlert', {alertMessage: '활동회원이 아닙니다.'});
                    return;
                }

                if (this.candidateIdeas.length !== this.maxVoteCount) {
                    this.$store.commit('common/showAlert', {alertMessage: `${this.maxVoteCount}개까지 선택해 주세요.`});
                    return;
                }

                this.$store.commit('common/showConfirm', {
                    confirmMessage: '지금 투표 하시겠어요? \n투표는 수정이 불가능 합니다',
                    confirmYesButtonText: '투표하기',
                    confirmNoButtonText: '취소',
                    confirmNoFunction: null,
                    confirmYesFunction: () => {
                        this.$store.dispatch('main/VOTE_SUMMIT')
                            .then(() => {
                                this.$store.dispatch(RELOAD_AUTH);
                            })
                            .then(() => {
                                this.$store.dispatch(`main/${ACTIONS.RELOAD_VOTED_IDEAS}`);
                            })
                            .then(() => {
                                window.vm.$notify.success({
                                    title: '아이디어 투표',
                                    message: '투표가 완료되었습니다️'
                                });
                            });
                    }
                });
            },

            removeCandidateIdea(ideaId) {
                this.removeCandidateIdeaAction(ideaId);
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
        width: 810px;
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

    .session-info-idea-put-basket-box {
        margin-top: 39px;
        width: 130px;
        height: 24px;
        text-align: left;
    }

    .session-info-idea-put-basket {
        width: 86px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.98px;
        color: #4a4a4a;
    }

    .session-info-idea-put-basket-count {
        width: 30px;
        height: 19px;
        margin-left: 14px;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.44px;
        color: #9b9b9b;
    }

    .session-info-idea-vote-info-message-box {
        margin-top: 30px;
        text-align: left;
    }

    .session-info-idea-vote-info-message {
        width: 574px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        color: #9b9b9b;
    }

    .session-info-idea-vote-info-message-plus-icon {
        vertical-align: middle;
        width: 20px;
        height: 20px;
        margin: 0px 4px 4px 4px;
        object-fit: contain;
    }

    .session-info-idea-vote-image-wrap {
        width: 390px;
        position: relative;
    }

    .session-info-idea-vote-button-box {
        position: absolute;
        bottom: 42px;
        right: 0px;
    }

    .session-info-idea-vote-button {
        width: 200px;
        height: 56px;
        border-radius: 6px;
        background-color: #eeeeee;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .available-vote-button {
        background-color: #ff5000!important;
    }

    .session-info-idea-vote-button-text {
        width: 130px;
        height: 27px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.82px;
        color: #9b9b9b;
    }

    .available-vote-button-text {
        color: #ffffff!important;
    }

    /**
        투표 담고나서 리스트 박스
     */
    .session-info-idea-vote-candidateIdeas-wrap {
        margin-top: 14px;
        display: flex;
    }

    .session-info-idea-vote-candidateIdeas-box {
        width: 262px;
        height: 56px;
        margin-right: 12px;
        padding: 0px 16px;
        border-radius: 6px;
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        z-index: 2;
    }

    .session-info-idea-vote-candidateIdeas-text {
        width: 186px;
        height: 27px;
        text-overflow: ellipsis;
        text-align: left;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1.1px;
        color: #000000;
    }

    .session-info-idea-vote-candidateIdeas-idea-remove {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .session-info-idea-vote-candidateIdeas-idea-remove-button {
        margin-left: 24px;
    }

    .session-info-idea-vote-button-text {
        width: 186px;
        height: 27px;
        margin: 15px 24px 14px 16px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1.1px;
        color: #000000;
    }

    .session-info-idea-vote-image-box {
        width: 560px;
        height: 399px;
        position: absolute;
        top: 17px;
        right: -50px;
    }

    .session-info-idea-vote-image {
        width: 550px;
        height: 340px;
        object-fit: contain;
    }

    .session-info-mini-wrap {
        position: fixed;
        top: 72px;
        width: 100%;
        height: 132px;
        z-index: 99;
        background-color: white;
    }

    .available-vote-button-box {
        bottom: 0px!important;
    }
</style>
