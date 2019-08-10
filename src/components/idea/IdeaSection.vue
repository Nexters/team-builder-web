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
                        <div class="list-info">전체 아이디어 {{ ideaListLength }}건</div>
                        |
                        <div class="star on">즐겨찾기만 보기</div>
                        <!-- click on event -->
                        <!--<div class="all">전체 아이디어 보기</div>-->
                        <!--</div>-->
                    </section>
                    <section class="header-right">
                        <div class="search">
                            <button class="Rectangle-Copy"><span>태그검색</span></button>
                            <!-- TO-DO 검색 이미지 넣기 -->
                            <!-- 검색 기능 -->
                            <input type="search"
                                   class="search-input Rectangle"
                                   v-on:input="searchTerm = $event.target.value"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   @keyup="filterData({duration: 500})"
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
                        <div class="title" style="width: 48px; line-height: 1.29; margin-left: 10px">즐겨찾기</div>
                        <div class="title" style="width: 24px; line-height: 1.29; margin-left: 14px">번호</div>
                        <div class="title" style="width: 62px; line-height: normal; margin-left: 18px">아이디어 명</div>
                        <div class="title" style="width: 24px; line-height: normal; margin-left: 447px">태그</div>
                        <!-- 클릭 시 안내 창-->
                        <img src="../../assets/img/ico-table-tag@2x.png" class="ico_table_tag" />
                        <div class="title" style="width: 24px; line-height: normal; margin-left: 299px">직군</div>
                        <!-- 클릭 시 정렬(오름차순, 원상복구) -->
                        <img src="../../assets/img/group-10@2x.png" class="Group-10" onclick="sorting('position')">
                        <div class="title" style="width: 36px; line-height: normal; margin-left: 20px">작성자</div>
                        <div class="title" style="width: 24px; line-height: normal; margin-left: 30px">날짜</div>
                        <!-- 클릭시 정렬(오름차순, 원상복구) -->
                        <img src="../../assets/img/group-10@2x.png" class="Group-10">
                    </div>
                    <IdeaList></IdeaList>
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

  export default {
    name: "IdeaSection",
    components: {
      IdeaList
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
      })
    },

    methods: {
      ...mapActions({
        filterData: ACTIONS.ENTER_SEARCH_TERM,
      }),

    },
  }
</script>

<style src="./IdeaSection.css" scoped>
</style>