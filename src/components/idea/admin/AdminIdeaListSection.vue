<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <div class="card">
                <div class="card-header">
                    <section class="header-left">
                        <div class="list-info">
                            <div v-show="!nowIsTeamBuilding && (getTypeNow === 'IDEA_COLLECT' || getTypeNow === 'IDEA_VOTE')" id="view-all"
                                 style="display: inline;">전체 아이디어
                            </div>
                            <div v-show="nowIsTeamBuilding || getTypeNow === 'IDEA_CHECK' || getTypeNow === 'TEAM_BUILDING'"
                                 style="display: inline;">선정 아이디어
                            </div>
                            <div style="display: inline"> {{ ideaListLength }}건</div>
                        </div>
                    </section>
                    <section class="header-right">
                        <div class="idea-management" v-show="getTypeNow !== 'IDEA_COLLECT' && getTypeNow !== 'IDEA_VOTE'">
                            <button class="Rectangle-Copy" @click="clickSelection"><span>아이디어 선정</span></button>
                            <button class="Rectangle-Copy cancel" @click="clickUnSelection"><span>아이디어 선정 해지</span></button>
                        </div>

                        <div class="search-circle row" v-bind:style="searchBoxMouseHoverStyle">
                            <input type="search"
                                   class="search-input"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   v-on:input="searchTerm = $event.target.value"
                                   @focusin="searchFocus"
                                   @focusout="searchFocusOut"
                                   @keyup="filterData"
                                   @search="searchClear">
                            <img :src="require('@/assets/img/ico-search@2x.png')" width="22px" height="22px">
                        </div>
                    </section>
                </div>

                <div class="card-body">
                    <b-form-group>
                        <div class="titles">
                            <!--<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                            <div class="title" style="width: 46px; padding-left: 28px">
                                <div class="custom-checkbox">
                                    <b-form-checkbox v-model="allSelected" @change="toggleAll"/>
                                </div>
                            </div>
                            <div class="title" style="width: 62px; margin-left: 26px">아이디어 명</div>
                            <div class="title" style="width: 24px; margin-left: 701px">직군</div>
                            <div class="title" style="width: 36px; margin-left: 42px">작성자</div>
                            <div class="title" style="width: 24px; margin-left: 30px">날짜</div>
                            <div class="title" style="width: 24px; margin-left: 76px;">득표</div>
                            <img src="@/assets/img/group-10@2x.png" class="Group-10"
                                 v-on:click="sorting" style="cursor:pointer; margin-left: 6px;">
                            <div class="title" style="width: 48px; margin-left: 20px">선정여부</div>
                        </div>
                        <admin-idea-list @goDetail="goDetail" :allSelected.sync="allSelected"
                                         :select="select"></admin-idea-list>
                    </b-form-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/main';
    import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';

    const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');

    import AdminIdeaList from "@/components/idea/admin/AdminIdeaList";

    export default {
        name: "AdminIdeaListSection",
        components: {
            AdminIdeaList
        },

        data() {
            return {
                sortVoteNumberDESC: false,
                allSelected: false,
                select: [],
                searchBoxMouseHoverStyle: {},
            }
        },

        computed: {
            searchTerm: {
                set(value) {
                    this.$store.commit('main/SET_SEARCH_TERM', value);
                },
                get() {
                    return this.$store.state.main.searchTerm;
                }
            },

            ...mapGetters({
                selectedIdeaListLength: GETTERS.SELECTED_IDEA_LIST_LENGTH,
                ideaListResult: GETTERS.GET_LIST,
                getTypeNow: GETTERS.GET_PERIOD_TYPE_NOW,
            }),

            ...mapState({
                teamBuildingMode: state => state.session.teamBuildingMode,
            }),

          ideaListLength() {
              return this.nowIsTeamBuilding ? this.selectedIdeaListLength : this.ideaListResult.length;
          },

          nowIsTeamBuilding() {
              return this.teamBuildingMode || (this.getTypeNow === 'TEAM_BUILDING');
          },

        },

        methods: {
            sorting() {
                this.sortVoteNumberDESC = !this.sortVoteNumberDESC
                if (this.sortVoteNumberDESC) {
                    return this.$store.commit('main/SORT_LIST_BY_VOTE_NUMBER_DESC')
                }

                return this.$store.dispatch('main/SHOW_ORIGIN_LIST');
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

            toggleAll(checked) {
                bus.$emit('toggleAll', checked);
            },

            clickSelection() {
                bus.$emit('clickSelection');
            },

            clickUnSelection() {
                bus.$emit('clickUnSelection');
            },

            goDetail(id) {
                this.$store.commit('common/setNowScrollTop');
                this.$router.push({
                    path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${id}`,
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
        },

        created() {
            this.$on('allSelected', this.allSelected);
        },


    }
</script>

<style scoped>
    .main-idea-list-wrap {
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        margin-left: 70px;
    }

    .main-idea-contents-wrap {
        width: 1200px;
    }

    .card {
        background-color: #fff;
        background-clip: border-box;
        border: 0 rgba(0, 0, 0, 0);
        border-radius: 0;
    }

    .card-header {
        margin-bottom: 0;
        border-bottom: 0;
        padding: 0 0 65px 0;
        background-color: #F5F5F5;
    }

    .header-left {
        display: inline-block;
        float: left;
        width: 40%;
        text-align: left;
        margin-top: 38px;
    }

    .header-right {
        display: inline-block;
        float: right;
        height: 75px;
        margin-top: 25px;
    }

    .list-info {
        display: inline;
        width: 130px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #4a4a4a;
        margin-right: 0.6%;
    }

    .idea-management {
        display: inline-block;
        margin-top: 2px;
    }

    .theme {
        display: inline;
        width: 102px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #4a4a4a;
        margin-left: 1.3%;
    }

    .search-circle {
        width: 333px;
        height: 50px;
        border-radius: 6px;
        border: solid 1px #eeeeee;
        background-color: #ffffff;
        padding: 0 14px;
        margin: 0;
        outline: none;
        vertical-align: center;
        align-items: center;
        justify-content: center;
        display: inline-block;
    }

    .search-input {
        width: 270px;
        height: 100%;
        padding: 0 8px 0 0;
        border: 0;
        box-shadow: none;
    }
    .search-input::placeholder {
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.53px;
        color: #9b9b9b;
    }
    .search-input:focus {
        outline: none;
        box-shadow: none;
    }

    .Rectangle-Copy {
        width: 144px;
        height: 46px;
        border-radius: 6px;
        background-color: #273ea5;

        padding: 11px 29.5px;
        margin-right: 16px;
    }

    .cancel {
        padding-right: 11px;
        padding-left: 11px;
    }

    .Rectangle-Black {
        background-color: #4a4a4a;
    }

    span {
        width: 85px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .Rectangle {
        width: 333px;
        height: 50px;
        border-radius: 6px;
        border: solid 1px #eeeeee;
        background-color: #ffffff;
    }

    .ico_search {
        position: absolute;
        left: 291px;
        bottom: 11px;

        width: 28px;
        height: 28px;
        object-fit: contain;
    }

    .card-body {
        background-color: #f5f5f5;
        padding: 0;
    }


    .titles {
        height: 20px;
        text-align: left;
        margin-bottom: 16px;
    }

    .title {
        display: inline-block;
        font-family: NotoSansCJKkr;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        color: #4a4a4a;
    }

    .Group-10 {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin-left: 6px;
    }
</style>
