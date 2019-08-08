<!-- TO-DO column별로 정렬 기능 구현 -->
<!-- TO-DO 작성자 검색 기능 구현 -->
<!-- TO-DO icon 삽입 -->
<!-- TO-DO 폰트 -->
<template>
        <table class="board">
            <tbody>
            <tr class="Rectangle list" v-for="idea in ideaListResult" :key="idea.orderNumber">
                <!-- table column의 index, favorite이 0으로 시작 -->
                <!-- favorite -->
                <td style="padding-top: 26px; padding-bottom: 25px; width: 58px">
                    <div class="favorite">
                        <img v-if="idea['favorite']" src="../../../assets/img/favourites-filled-star-symbol-copy@2x.png" class="favourites-filled-star-symbol-copy">
                        <img v-else src="../../../assets/img/favourites-filled-star-symbol@2x.png" class="favourites-filled-star-symbol" />
                        <!--<img src="../../../assets/img/favourites-filled-star-symbol@2x.png" class="favourites-filled-star-symbol">-->
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