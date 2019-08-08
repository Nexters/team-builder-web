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
                                   v-model="searchTerm"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   @keyup="filterData()" />
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
                        <img src="../../assets/img/ico-table-tag@2x.png" class="ico_table_tag" />
                        <div class="title" style="width: 24px; line-height: normal; margin-left: 299px">직군</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10">
                        <div class="title" style="width: 36px; line-height: normal; margin-left: 20px">작성자</div>
                        <div class="title" style="width: 24px; line-height: normal; margin-left: 30px">날짜</div>
                        <img src="../../assets/img/group-10@2x.png" class="Group-10">
                    </div>
                    <IdeaList></IdeaList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapGetters, mapState} = createNamespacedHelpers('main');

  import IdeaList from '@/components/idea/list/IdeaListDefault';

  export default {
    name: "IdeaSection",
    components: {
      IdeaList
    },

    computed: {
      ...mapState([
        'searchTerm'
      ]),

      ...mapGetters({
        ideaListLength: GETTERS.LIST_LENGTH
      })
    }
  }
</script>

<style src="./IdeaSection.css" scoped>
</style>