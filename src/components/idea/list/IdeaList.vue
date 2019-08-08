<!-- TO-DO column별로 정렬 기능 구현 -->
<!-- TO-DO 작성자 검색 기능 구현 -->
<!-- TO-DO icon 삽입 -->
<!-- TO-DO 폰트 -->
<template>
    <div class="card">
        <div class="card-header">
            <section class="header-left">
                <div class="list-info">전체 아이디어 {{ ideaListLength }}건</div>
                |
                <div class="star on">즐겨찾기만 보기</div>
                <!-- click on event -->
                <!--<div class="all">전체 아이디어 보기</div>-->
            </section>
            <section class="header-right">
                <div class="search">
                    <button class="Rectangle-Copy"><span>태그검색</span></button>
                    <!-- TO-DO 검색 이미지 넣기 -->
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
                <img src="../../../assets/img/ico-table-tag@2x.png" class="ico_table_tag" />
                <div class="title" style="width: 24px; line-height: normal; margin-left: 299px">직군</div>
                <img src="../../../assets/img/group-10@2x.png" class="Group-10">
            <div class="title" style="width: 36px; line-height: normal; margin-left: 20px">작성자</div>
            <div class="title" style="width: 24px; line-height: normal; margin-left: 30px">날짜</div>
                <img src="../../../assets/img/group-10@2x.png" class="Group-10">
        </div>
            <table class="board">
                <tbody>
                <tr class="Rectangle list" v-for="idea in ideaListResult" :key="idea.orderNumber">
                    <!-- table column의 index, favorite이 0으로 시작 -->
                    <!-- favorite -->
                    <td style="padding-top: 26px; padding-bottom: 25px; width: 58px">
                        <div class="favorite">
                            <!-- 사진 -->
                            <button></button>
                        </div>
                    </td>
                    <!-- order-number -->
                    <td style="padding: 29px 0; width: 49px">
                        <div class="order-number">
                            {{ idea['orderNumber'] }}
                        </div>
                    </td>
                    <!-- idea-name-->
                    <td style="padding: 25px 0; width: 476px;">
                        <div class="idea-name">
                            {{ idea['title'] }}
                        </div>
                    </td>
                    <!-- tags -->
                    <!-- Tag Component 생성-->
                    <td style="padding: 17px 0 17px 40px; width: 373px">
                        <div class="tags" v-for="{ name } in idea['tags']">
                            <div class="tag">{{ name }}</div>
                        </div>
                    </td>
                    <!-- position -->
                    <td style="padding: 25px 0; width: 67px">
                        <div class="position">
                            {{ idea['author'].position }}
                        </div>
                    </td>
                    <!-- author -->
                    <td style="padding: 25px 0; width: 56px;">
                        <div class="author">
                            {{ idea['author'].name }}
                        </div>
                    </td>
                    <!-- created At -->
                    <td style="padding: 26px 18px 26px 0; width: 108px;">
                        <div class="created-at">
                            {{ idea['createdAt'] }}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  import {GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaList",
    model: {
      // prop: "checked",
      event: "change"
    },

    computed:  {
      ...mapState([
        'ideaList',
        'searchTerm'
      ]),

      ...mapGetters({
        ideaListResult: GETTERS.SHOW_LIST,
        ideaListLength: GETTERS.LIST_LENGTH
      })
    },



    methods: {
      //   ideaListResult() {
      //     return this.ideas;
      //   },

      // filterData() {
      //   this.searchTerm = this.searchTerm.toLowerCase();
      //   if(this.searchTerm === "") {
      //     this.ideas = this.ideaList;
      //     return;
      //   }
      //
      //   this.ideas = this.ideaList.filter(idea => {
      //       ["title", "name"].some(function (search) {
      //         if(search === "title") {
      //           if(idea[search].toLowerCase().includes(this.searchTerm) !== 'undefined') {
      //             return true;
      //           } else {
      //             return false;
      //           }
      //         } else {
      //           if(idea[search].name.toLowerCase().includes(this.searchTerm) !== 'undefined') {
      //             return true;
      //           } else {
      //             return false;
      //           }
      //         }
      //       })
      //   }
      //
      //       // if (idea.title.)
      //   //   ["title", "author"].some(function (search) {
      //   //     if(search === "title") {
      //   //       idea[search].toLowerCase().includes(this.searchTerm)
      //   //     } else {
      //   //       idea[search].name.toLowerCase().includes(this.searchTerm)
      //   //     }
      //   //   })
      //   // );
      //   //     ["title"].some(search =>
      //   //       idea[search].toLowerCase().includes(this.searchTerm)
      //   //     )
      //   );
      //   console.log(this.ideas);
      // },

      select(ideas) {
        this.ideas = ideas;
        console.log(ideas);
      }
    }
  };
</script>

<style src="./ideaList.css" scoped>

</style>