<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <div class="card">
                <div class="card-header">
                    <section class="header-left">
                        <div v-show="showSearchTagResult">
                            <div class="tag-result">
                                태그 '{{ getSearchTagName }}' 외 {{ searchTagResult - 1 }}건 검색결과 {{ ideaListLength }}건
                            </div>
                            <img src="@/assets/img/cancellation.png" class="cancellation" @click="cancelTagSearch">
                        </div>
                        <div v-show="!showSearchTagResult">
                            <div class="list-info">
                                <div id="view-all" v-show="!favorite">전체 아이디어 </div>
                                <div id="view-star" v-show="favorite">즐겨찾기한 아이디어</div>
                                <div style="display: inline">{{ ideaListLength }}건</div>
                            </div>
                            |
                            <div class="theme" style="cursor:pointer"
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
                            <input type="search"
                                   class="search-input Rectangle"
                                   v-on:input="searchTerm = $event.target.value"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   @keyup="filterData()"
                            />
                        </div>
                    </section>
                </div>

                <div  v-show="nowPeriodType === 'IDEA_COLLECT'" class="card-body">
                    <div class="default titles">
                        <!--<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                        <div class="title" style="width: 48px; height: 18px; line-height: 1.29;
                        margin-left: 10px; margin-bottom: 1px">즐겨찾기</div>
                        <div class="title" style="width: 24px; height: 18px; line-height: 1.29;
                        margin-left: 14px; margin-bottom: 1px;">번호</div>
                        <div class="title" style="width: 62px; margin-left: 18px">아이디어 명</div>
                        <div class="title" style="width: 24px; margin-left: 447px">태그</div>
                        <el-popover
                                placement="bottom"
                                width="400"
                                trigger="hover"
                                content='태그 영역위에 마우스를 올리면 전체태그를 볼 수 있어요. 개발자태그는 그린박스, 디자이너태그는 옐로우박스예요.'>
                            <img class="ico_table_tag" slot="reference" :src="require('../../assets/img/ico-table-tag@2x.png')">
                        </el-popover>
                        <div class="title" style="width: 24px; margin-left: 291px">직군</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('position')" style="cursor:pointer; margin-left: 6px;">
                        <div class="title" style="width: 36px; margin-left: 24px">작성자</div>
                        <div class="title" style="width: 24px; margin-left: 36px">날짜</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('date')" style="cursor:pointer; margin-left: 6px;">
                    </div>
                    <idea-list-recruiting @goDetail="goDetail"></idea-list-recruiting>
                </div>

                <div v-show="nowPeriodType === 'IDEA_VOTE' || nowPeriodType === 'IDEA_CHECK'" class="card-body">
                    <div class="titles">
                        <!--<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                        <div class="title" style="width: 48px; height: 18px; line-height: 1.29;
                        margin-left: 10px; margin-bottom: 1px;">즐겨찾기</div>
                        <div class="title" style="width: 24px; height: 18px; line-height: 1.29;
                        margin-left: 14px; margin-bottom: 1px;">번호</div>
                        <div class="title" style="width: 62px; margin-left: 18px">아이디어 명</div>
                        <div class="title" style="width: 24px; margin-left: 397px">태그</div>
                        <el-popover
                                placement="bottom"
                                width="400"
                                trigger="hover"
                                content='태그 영역위에 마우스를 올리면 전체태그를 볼 수 있어요. 개발자태그는 그린박스, 디자이너태그는 옐로우박스예요.'>
                            <img class="ico_table_tag" slot="reference" :src="require('../../assets/img/ico-table-tag@2x.png')">
                        </el-popover>
                        <div class="title" style="width: 24px; margin-left: 291px">직군</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('position')" style="cursor:pointer; margin-left: 6px;">
                        <div class="title" style="width: 36px; margin-left: 20px">작성자</div>
                        <div class="title" style="width: 24px; margin-left: 30px">날짜</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('date')" style="cursor:pointer; margin-left: 6px;">
                        <!-- 선정 전에는 안보임 -->
                        <div v-show="nowPeriodType === 'IDEA_CHECK'" class="title" style="width: 48px; margin-left: 48px">선정여부</div>
                    </div>
                    <idea-list-vote-and-check @goDetail="goDetail"></idea-list-vote-and-check>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        sortPositionASC: false,
        sortDateASC: false,
        favorite: false,
        showPopUp: false,
        showSearchTagResult: false,

      }
    },

    computed: {
      searchTerm: {
        set (value) {
          this.$store.commit('main/SET_SEARCH_TERM', value);
        },
        get() {
          return this.$store.state.main.searchTerm;
        }
      },

      ...mapGetters({
        ideaListLength: GETTERS.LIST_LENGTH,
        searchTagResult: GETTERS.SEARCH_TAG_LIST_LENGTH,
        getSearchTagName: GETTERS.GET_SEARCH_TAGS_FIRST_NAME,
        nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,
      }),

      // ...mapMutations([
      //   'SET_SEARCH_TERM'
      // ])

    },

    methods: {
      // ...mapActions([
      //   'ACTIONS.ENTER_SEARCH_TERM',
      //   'ACTIONS.POSITION_SORT_LIST',
      //   'ACTIONS.DATE_SORT_LIST',
      //   'ACTIONS.SHOW_ORIGIN_LIST',
      // ]),

      sorting(by) {
        if (by === 'position') {
            this.sortPositionASC = !this.sortPositionASC;
            if(this.sortPositionASC) {
              return this.$store.commit('main/SORT_LIST_BY_POSITION_ASC');
            }
          return this.$store.commit('main/SORT_LIST_BY_POSITION_DESC');
          }

        if (by === 'date') {
          this.sortDateASC = !this.sortDateASC;
          if (this.sortDateASC) {
            return this.$store.commit('main/SORT_LIST_BY_DATE_ASC');
          }
          return this.$store.commit('main/SORT_LIST_BY_DATE_DESC');
        }
      },

      filterData() {
        if(this.searchTerm === '') {
          this.$store.dispatch('main/SHOW_ORIGIN_LIST');
          return;
        }
        console.log('검색어 입력')
        this.$store.dispatch('main/ENTER_SEARCH_TERM');
      },

      showFavorite(star) {
        this.sortPositionASC = false;
        this.sortDateASC = false;
        return star ? this.$store.commit('main/SET_FAVORITE_LIST')
          : this.$store.dispatch('main/SHOW_ORIGIN_LIST')
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
        console.log(id);
        this.$router.push({
          path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${id}`
        });
      },
    },
  }
</script>

<style src="./IdeaSection.css" scoped>
</style>