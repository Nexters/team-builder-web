<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <div class="card">
                <div class="card-header">
                    <section class="header-left">
                        <div v-show="showSearchTagResult">
                            <div class="tag-result">
                                {{ tagSearchResultMessage }}
                            </div>
                            <img src="@/assets/img/cancellation.png" class="cancellation" @click="cancelTagSearch">
                        </div>
                        <div v-show="!showSearchTagResult">
                            <div class="list-info">
                                <div id="view-all" v-show="!favorite">전체 아이디어</div>
                                <div id="view-star" v-show="favorite">즐겨찾기한 아이디어</div>
                                <div style="display: inline"> {{ ideaListLength }}건</div>
                            </div>
                            |
                            <div class="theme" style="cursor:pointer"x
                                 v-on:click="showFavorite(favorite = !favorite)">
                                <div id="all" v-show="favorite">전체 아이디어 보기</div>
                                <div id="star" v-show="!favorite">즐겨찾기만 보기</div>
                            </div>
                        </div>
                    </section>

                    <section class="header-right">
                        <div class="search">
                            <button class="Rectangle-Copy" @click="showPopUp = true"><span>태그검색</span></button>
                            <SelectSearchTag v-if="showPopUp"
                                             @close="showPopUp = false"
                                             @searchTags="searchTags">
                            </SelectSearchTag>

                            <!-- 검색 기능 -->
                            <div class="search-circle row" v-bind:style="searchBoxMouseHoverStyle">
                                <input type="search"
                                       id="search"
                                       class="search-input"
                                       placeholder="제목과 작성자를 검색해주세요."
                                       v-on:input="searchTerm = $event.target.value"
                                       @focusin="searchFocus"
                                       @focusout="searchFocusOut"
                                       @keyup="filterData"
                                       @search="searchClear">
                                <img :src="require('@/assets/img/ico-search@2x.png')" width="22px" height="22px">
                            </div>
                        </div>
                    </section>
                </div>

                <div class="card-body">
                    <div class="titles">
                        <!--<div classse="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                        <div class="title favorite">즐겨찾기</div>
                        <div class="title order-number">번호</div>
                        <div class="title idea-name">아이디어 명</div>
                        <div class="title tag" :class="{'idea-collect-tag': nowPeriodType === 'IDEA_COLLECT'}">태그</div>
                        <el-popover
                                placement="bottom"
                                width="400"
                                trigger="hover"
                                content='태그 영역위에 마우스를 올리면 전체태그를 볼 수 있어요. 개발자태그는 그린박스, 디자이너태그는 옐로우박스예요.'>
                            <img class="ico_table_tag" slot="reference"
                                 :src="require('../../assets/img/ico-table-tag@2x.png')">
                        </el-popover>
                        <div class="title position">직군</div>
                        <div class="title writer">작성자</div>
                        <div class="title date" :class="{'idea-collect-date': nowPeriodType === 'IDEA_COLLECT'}">날짜</div>
                        <img src="@/assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting()">
                        <!-- 선정 전에는 안보임 -->
                        <div v-show="nowPeriodType === 'IDEA_CHECK'" class="title selection">선정여부
                        </div>
                    </div>
                    <idea-list-recruiting v-if="nowPeriodType === 'IDEA_COLLECT'" @goDetail="goDetail"></idea-list-recruiting>
                    <idea-list-vote-and-check v-else @goDetail="goDetail"></idea-list-vote-and-check>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getLatestSession} from "@/api/sessionApi";

    import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';

    const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');

    import IdeaListRecruiting from '@/components/idea/list/IdeaListRecruiting';
    import IdeaListVoteAndCheck from "@/components/idea/list/IdeaListVoteAndCheck";
    import SelectSearchTag from "@/components/common/tag/SelectSearchTag";

    export default {
        name: "IdeaSection",
        components: {
            IdeaListVoteAndCheck,
            SelectSearchTag,
            IdeaListRecruiting
        },

        data() {
            return {
                sortDateASC: false,
                favorite: false,
                showPopUp: false,
                showSearchTagResult: false,
                isActive: false,
                searchBoxMouseHoverStyle: {},
            }
        },

        computed: {
            searchTerm: {
                set(value) {
                    this.$store.commit('main/SET_SEARCH_TERM', value);
                    this.favorite = false;
                },
                get() {
                    return this.$store.state.main.searchTerm;
                }
            },

            tagSearchResultMessage() {
                if (this.searchTagResult === 1) {
                    return `태그 '${this.getSearchTagName}' 검색결과 ${this.ideaListLength}건`;
                }
                return `태그 '${this.getSearchTagName}' 외 ${this.searchTagResult - 1}건 검색결과 ${this.ideaListLength}건`;
            },

            ...mapGetters({
                ideaListLength: GETTERS.LIST_LENGTH,
                searchTagResult: GETTERS.SEARCH_TAG_LIST_LENGTH,
                getSearchTagName: GETTERS.GET_SEARCH_TAGS_FIRST_NAME,
                nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,

            }),

            isActiveSession: function () {
                getLatestSession().then(res => {
                    this.isActive = (res.data.sessionNumber === this.$store.state.main.session.sessionNumber)
                });

                return this.isActive;
            },
        },

        methods: {
            sorting() {
              this.sortDateASC = !this.sortDateASC;
              return this.sortDateASC ? this.$store.commit('main/SORT_LIST_BY_DATE_ASC') : this.$store.dispatch('main/SORT_BY_DEFAULT');
            },

            filterData() {
                if (this.searchTerm === '') {
                    this.$store.dispatch('main/SHOW_ORIGIN_LIST');
                    return;
                }
                this.$store.dispatch('main/ENTER_SEARCH_TERM');
            },

            searchClear() {
                this.filterData()
            },

            showFavorite(star) {
                this.sortDateASC = false;

                // 검색어 삭제
                this.searchTerm = '';
                document.getElementById('search').value = this.searchTerm;
                this.favorite = star;

                return star ? this.$store.commit('main/SET_FAVORITE_LIST')
                    : this.filterData()
            },

            cancelTagSearch() {
                this.showSearchTagResult = false;
                return this.$store.commit('main/SAVE_ORIGIN_LIST');
            },

            searchTags() {
                this.showSearchTagResult = true;
                this.showPopUp = false;
                return this.$store.dispatch('main/SEARCH_TAGS');
            },

            goDetail(id) {
                this.$router.push({
                    path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${id}`
                });
            },

            searchFocus() {
                this.searchBoxMouseHoverStyle = {
                    'outline': 'none',
                    'border': '1px solid #273EA5',
                    'box-shadow': 'none'
                };
            },
            searchFocusOut() {
                this.searchBoxMouseHoverStyle = {};
            }
        }
    }
</script>

<style src="./IdeaSection.css" scoped>
</style>
