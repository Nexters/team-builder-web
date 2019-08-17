<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <div class="card">
                <div class="card-header">
                    <section class="header-left">
                        <!--<div v-if="searchTagResult" class="tag-result">-->
                        <!--태그 ‘IOS 개발자’ 외 4건 검색결과 20건     -->
                        <!--</div>-->
                        <!--<div v-else>-->
                        <div class="list-info">
                            <div id="view-all" style="display: inline;">전체 아이디어 </div>
                            <div id="view-star" style="display: none;">즐겨찾기한 아이디어</div>
                            <div style="display: inline">{{ ideaListLength }}건</div>
                        </div>
                        |
                        <div class="theme" style="cursor:pointer"
                             v-on:click="showFavorite(favorite = !favorite)">
                            <div id="all" style="display: none;">전체 아이디어 보기</div>
                            <div id="star" style="display: inline-block">즐겨찾기만 보기</div>
                        </div>
                    </section>
                    <section class="header-right">
                        <div class="search">
                            <button class="Rectangle-Copy" @click="showPopUp = true"><span>태그검색</span></button>
                            <SelectSearchTag v-if="showPopUp" @close="showPopUp = false"></SelectSearchTag>
                            <!-- TO-DO 검색 이미지 넣기 -->
                            <!-- 검색 기능 -->
                            <input type="search"
                                   class="search-input Rectangle"
                                   v-on:input="searchTerm = $event.target.value"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   @keyup="filterData()"
                            />

                            <!-- 검색 박스 다른 버전 -->
                            <!--<img src="../../../assets/img/ico-search@2x.png" class="ico_search" />-->
                            <!--&gt;-->
                            <!--<img src="../../../assets/img/ico-search@2x.png" class="ico_search"/>-->
                            <!--<div contenteditable="true"-->
                            <!--class="search-input Rectangle"-->
                            <!--v-model="searchTerm"-->
                            <!--placeholder="제목과 작성자를 검색해주세요."-->
                            <!--@keyup="filterData()">-->
                            <!--<img src="../../../assets/img/ico-search@2x.png"-->
                            <!--class="ico_search">-->
                            <!--</div>-->

                        </div>
                    </section>
                </div>
                <div class="card-body">
                    <div class="titles">
                        <!--<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                        <div class="title" style="width: 48px; height: 18px; line-height: 1.29;
                        margin-left: 10px; margin-bottom: 1px;">즐겨찾기</div>
                        <div class="title" style="width: 24px; height: 18px; line-height: 1.29;
                        margin-left: 14px; margin-bottom: 1px;">번호</div>
                        <div class="title" style="width: 62px; margin-left: 18px">아이디어 명</div>
                        <div class="title" style="width: 24px; margin-left: 397px">태그</div>
                        <!-- 클릭 시 안내 창-->
                        <img src="../../assets/img/ico-table-tag@2x.png" class="ico_table_tag"
                             style="cursor:pointer; margin-left: 6px;" />
                        <div class="title" style="width: 24px; margin-left: 291px">직군</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('position')" style="cursor:pointer; margin-left: 6px;">
                        <div class="title" style="width: 36px; margin-left: 20px">작성자</div>
                        <div class="title" style="width: 24px; margin-left: 30px">날짜</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10"
                             v-on:click="sorting('date')" style="cursor:pointer; margin-left: 6px;">
                        <!-- 선정 전에는 안보임 -->
                        <div class="title" style="width: 48px; margin-left: 42px">선정여부</div>
                    </div>

                    <!--<div class=" default titles">-->
                        <!--&lt;!&ndash;<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>&ndash;&gt;-->
                        <!--<div class="title" style="width: 48px; height: 18px; line-height: 1.29;-->
                        <!--margin-left: 10px; margin-bottom: 1px">즐겨찾기</div>-->
                        <!--<div class="title" style="width: 24px; height: 18px; line-height: 1.29;-->
                        <!--margin-left: 14px; margin-bottom: 1px;">번호</div>-->
                        <!--<div class="title" style="width: 62px; margin-left: 18px">아이디어 명</div>-->
                        <!--<div class="title" style="width: 24px; margin-left: 447px">태그</div>-->
                        <!--&lt;!&ndash; 클릭 시 안내 창&ndash;&gt;-->
                        <!--<img src="../../assets/img/ico-table-tag@2x.png" class="ico_table_tag"-->
                             <!--style="cursor:pointer; margin-left: 6px;" />-->
                        <!--<div class="title" style="width: 24px; margin-left: 291px">직군</div>-->
                        <!--<img src="../../assets/img/group-10@2x.png" class="Group-10"-->
                             <!--v-on:click="sorting('position')" style="cursor:pointer; margin-left: 6px;">-->
                        <!--<div class="title" style="width: 36px; margin-left: 24px">작성자</div>-->
                        <!--<div class="title" style="width: 24px; margin-left: 36px">날짜</div>-->
                        <!--<img src="../../assets/img/group-10@2x.png" class="Group-10"-->
                             <!--v-on:click="sorting('date')" style="cursor:pointer; margin-left: 6px;">-->
                    <!--</div>-->
                    <!--<IdeaList></IdeaList>-->
                    <IdeaListVote></IdeaListVote>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');

  import IdeaList from '@/components/idea/list/IdeaListDefault';
  import IdeaListVote from "@/components/idea/list/IdeaListVote";
  import SelectSearchTag from "@/components/common/tag/SelectSearchTag";

  export default {
    name: "IdeaSection",
    components: {
      IdeaListVote,
      SelectSearchTag,
      IdeaList
    },

    data() {
      return {
        sortPositionASC: false,
        sortDateASC: false,
        favorite: false,
        origin: 'all',
        change: 'star',
        viewOrigin: 'view-all',
        viewChange: 'view-star',
        showPopUp: false,
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
        ideaListLength: GETTERS.LIST_LENGTH
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
          if (this.sortPositionASC) {
            return this.$store.commit('main/SORT_LIST_BY_POSITION_ASC');
          }
          if(this.origin === 'star') {
            return this.$store.commit('main/SORT_LIST_BY_POSITION_DESC');
          }
        }

        if (by === 'date') {
          this.sortDateASC = !this.sortDateASC;
          if (this.sortDateASC) {
            return this.$store.commit('main/SORT_LIST_BY_DATE_ASC');
          }
          if(this.origin === 'star') {
            return this.$store.commit('main/SORT_LIST_BY_DATE_DESC');
          }
        }

        return this.$store.dispatch('main/SHOW_ORIGIN_LIST');
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
        [this.origin, this.change] = [this.change, this.origin];
        document.getElementById(this.origin).style.display = 'none';
        document.getElementById(this.change).style.display = 'inline-block';

        [this.viewOrigin, this.viewChange] = [this.viewChange, this.viewOrigin];
        document.getElementById(this.viewOrigin).style.display = 'inline';
        document.getElementById(this.viewChange).style.display = 'none';

        return star ? this.$store.commit('main/SET_FAVORITE_LIST')
          : this.$store.dispatch('main/SHOW_ORIGIN_LIST')
      }
    },
  }
</script>

<style src="./IdeaSection.css" scoped>
</style>