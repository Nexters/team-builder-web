<template>
    <div class="board">
        <div v-for="idea in ideaListResult" :key="idea.orderNumber">
            <!-- NOTICE -->
            <div v-if="idea['type'] === 'NOTICE'" class="Rectangle list type-notice">
                <!-- idea type -->
                <img src="@/assets/img/NOTICE.png" class="notice"/>
                <!-- order-number -->
                <div class="order-number">

                </div>
                <!-- idea-name-->
                <div class="idea-name-wrapper" @click="$emit('goDetail', idea.ideaId)">
                    <div class="idea-name notice-title">
                        {{ idea['title'] }}
                    </div>
                </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 12px; width: 327px; position: relative;">
                </div>
                <!-- position -->
                <div class="position" style="padding-left: 8px">

                </div>
                <!-- author -->
                <div class="author">
                    {{ idea['author'].name }}
                </div>
                <!-- created At -->
                <div class="created-at">
                    {{ idea['createdAt'] | formatDate }}
                </div>
            </div>

            <!-- IDEA -->
            <div v-else class="Rectangle list">
                <!-- favorite -->
                <div class="favorite">
                    <img v-show="idea['favorite'] === true" @click="clickFavorite(idea)"
                         src="@/assets/img/favourites-filled-star-symbol-copy@2x.png"
                         class="favourites-filled-star-symbol-copy">
                    <img v-show="idea['favorite'] === false" @click="clickFavorite(idea)"
                         src="@/assets/img/favourites-filled-star-symbol@2x.png"
                         class="favourites-filled-star-symbol"/>
                </div>
                <!-- order-number -->
                <div class="order-number">
                    {{ idea['orderNumber'] }}
                </div>
                <!-- idea-name-->
                <div class="idea-name-wrapper" @click="$emit('goDetail', idea.ideaId)">
                    <div class="idea-name">
                        {{ idea['title'] }}
                    </div>
                </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 12px; width: 327px; height: 40px; position: relative;">
                    <div v-show="idea['tags'].length === 0" class="not-select-tags">
                        태그를 선택하지 않았어요.
                    </div>
                    <div v-show="idea['tags'].length > 0" class="tags" v-for="(element, index) in idea['tags']"
                         v-if="index < 3"
                         v-on:mouseover="viewAllTags" v-on:mouseout="closeAllTags">
                        <div class="tag" v-if="element.type === 'DEVELOPER'" style="background-color: #daf4ea;">
                            <div class="tag-name" style="color: #208b84;">
                                {{ element['name'] }}
                            </div>
                        </div>
                        <div v-else class="tag" style=" background-color: #fff4d5;">
                            <div class="tag-name" style="color: #ff7205;">
                                {{ element['name'] }}
                            </div>
                        </div>
                    </div>
                    <div class="tag-popUp" v-if="idea['tags'].length > 3" style="float: right; display: none;">
                        <div class="tags" v-for="(element) in idea['tags']" style="margin: 0 6px; float: left">
                            <div class="tag" v-if="element.type === 'DEVELOPER'" style="background-color: #daf4ea;">
                                <div class="tag-name" style="color: #208b84;">
                                    {{ element['name'] }}
                                </div>
                            </div>
                            <div v-else class="tag" style=" background-color: #fff4d5;">
                                <div class="tag-name" style="color: #ff7205;">
                                    {{ element['name'] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- position -->
                <div class="position">
                    {{ positionFormat(idea['author'].position) }}
                </div>
                <!-- author -->
                <div class="author">
                    {{ idea['author'].name }}
                </div>
                <!-- created At -->
                <div class="created-at">
                    {{ idea['createdAt'] | formatDate }}
                </div>
                <!-- 투표 이미지 -->
                <div v-show="nowPeriodType === 'IDEA_VOTE'" class="idea-button">
                    <div v-show="!voteDone">
                        <img src="@/assets/img/group@2x.png"
                             v-show="!inSelectedIdeas(idea.ideaId)" @click="clickIdea(idea.ideaId)">
                        <img src="@/assets/img/idea-minus.png"
                             v-show="inSelectedIdeas(idea.ideaId)" @click="clickIdea(idea.ideaId)">
                    </div>
                    <div v-show="voteDone" class="on">
                        <img src="@/assets/img/voteEnd.png" v-show="!votedIdea(idea.ideaId)" style="cursor: default">
                        <img src="@/assets/img/ideaVoteCheck.png" v-show="votedIdea(idea.ideaId)">
                    </div>
                </div>

                <!-- 선정 이미지 -->
                <div v-show="nowPeriodType === 'IDEA_CHECK'" class="selection">
                    <img src="@/assets/img/selection.png" v-show="idea['selected']">
                    <img src="@/assets/img/non-selection.png" v-show="!idea['selected']">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    import {ACTIONS, GETTERS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';

    const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

    export default {
        name: "IdeaListVoteAndCheck",

        methods: {
            viewAllTags(event) {
                const popUp = event.target.closest('.td').lastChild;
                if (popUp.className) {
                    popUp.style.display = 'flex';
                }
            },

            closeAllTags(event) {
                const popUp = event.target.closest('.td').lastChild;
                if (popUp.className) {
                    popUp.style.display = 'none';
                }
            },

            clickFavorite: function (idea) {
                return this.$store.dispatch('main/FAVORITE_CHANGE', {ideaId: idea.ideaId, isFavorite: idea.favorite});
            },

            positionFormat(position) {
                if (position === 'DEVELOPER') {
                    return '개발자';
                }
                return '디자이너';
            },

            clickIdea(id) {
                if (this.inSelectedIdeas(id)) {
                    this.$store.commit('main/REMOVE_CANDIDATE_IDEA', id);
                    window.vm.$notify.error({
                        title: '아이디어 투표',
                        message: '아이디어를 장바구니에서 삭제했습니다.\n'
                    });
                    return;
                }

                if (this.maxVoteCount === this.candidateIdeas.length) {
                    this.$alert(`최대 ${this.maxVoteCount}개까지 선택할 수 있어요.`, '아이디어 투표', {
                            confirmButtonText: '확인'
                        }
                    )
                    return;
                }

                this.$store.commit('main/ADD_CANDIDATE_IDEA', id);
                window.vm.$notify.info({
                    title: '아이디어 투표',
                    message: '아이디어가 투표담기에 담겼습니다'
                });
            },

            inSelectedIdeas(id) {
                return this.candidateIdeas.findIndex(idea => (idea.ideaId === id)) > -1;
            },

            votedIdea(id) {
                return this.votedIdeas.findIndex(idea => (idea.ideaId === id)) > -1;
            }

        },

        computed: {
            ...mapState({
                ideaList: 'ideaList',
                candidateIdeas: 'candidateIdeas',
                maxVoteCount: 'maxVoteCount',

            }),

            ...mapGetters({
                ideaListResult: GETTERS.GET_LIST,
                nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,
                votedIdeas: GETTERS.GET_VOTED_IDEAS,

            }),

            voteDone() {
                return this.$store.state.auth.voted;
            },


        }
    }

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('YYYY.MM.DD')
        }
    })
</script>

<style src="./IdeaListVoteAndCheck.css" scoped>

</style>
