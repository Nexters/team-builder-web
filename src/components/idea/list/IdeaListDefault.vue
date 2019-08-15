<!-- TO-DO column별로 정렬 기능 구현 -->
<!-- TO-DO 작성자 검색 기능 구현 -->
<template>
        <div class="board">
            <!--<tbody>-->
            <div class="Rectangle list" v-for="idea in ideaListResult" :key="idea.orderNumber">
                <!-- table column의 index, favorite이 0으로 시작 -->
                <!-- favorite -->
                <div class="td" style="padding: 26px 12px 25px 22px; width: 58px; height: 74px;">
                    <div class="favorite" v-on:click="clickFavorite">
                        <img v-if="idea['favorite']" src="../../../assets/img/favourites-filled-star-symbol-copy@2x.png"
                             class="favourites-filled-star-symbol-copy">
                        <img v-else src="../../../assets/img/favourites-filled-star-symbol@2x.png"
                             class="favourites-filled-star-symbol" />
                    </div>
                </div>
                <!-- order-number -->
                <div class="td" style="padding: 29px 12px 29px 7px; width: 49px">
                    <div class="order-number">
                        {{ idea['orderNumber'] }}
                    </div>
                </div>
                <!-- idea-name-->
                <div class="td" style="padding: 24px 40px 26px 7px; width: 476px;">
                    <div class="idea-name">
                        {{ idea['title'] }}
                    </div>
                </div>
                <!-- tags -->
                <!-- Tag Component 생성-->
                <!-- 반복문 제어 확인 -->
                <!-- hover 이벤트 -->
                <div class="td" style="padding: 17px 0 17px 33px; width: 368px">
                    <div class="tags" v-for="(element, index) in idea['tags']" v-on:mouseover="viewAllTags" @mouseout="viewAllTagsClose" v-if="index < 3">
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
                    <div class="tag-popUp" v-if="idea['tags'].length > 3" style="float: right; display: inline">
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
                <div class="td" style="padding: 25px 7px 25px 9px; width: 72px;">
                    <div class="position">
                        {{ idea['author'].position }}
                    </div>
                </div>
                <!-- author -->
                <div class="td" style="padding: 25px 8px 25px 7px; width: 71px;">
                    <div class="author">
                        {{ idea['author'].name }}
                    </div>
                </div>
                <!-- created At -->
                <div class="td" style="padding: 29px 18px 26px 8px; width: 106px;">
                    <div class="created-at">
                        {{ format(idea['createdAt']) }}
                    </div>
                </div>
            </div>
            <!--</tbody>-->
        </div>
</template>

<script>
  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaList",
    model: {
      // prop: "checked",
      event: "change"
    },

    methods: {
      select(ideas) {
        this.ideas = ideas;
        console.log(ideas);
      },

      viewAllTags(event) {
        // const popUp = event.target.closest('.td').lastChild;
        // if(popUp.className) {
        //   popUp.style.display = 'inline';
        // }
      },

      viewAllTagsClose(event) {
        // const popUp = event.target.closest('.td').lastChild;
        // if(popUp.className) {
        //   popUp.style.display = 'none';
        // }
      },

      format(date) {
        const parsingStr = date.split(' ')[0];
        const returnDate = parsingStr.split('-');
        return returnDate[0] + '. ' + returnDate[1] + '. ' + returnDate[2]
      },

      clickFavorite: function (event) {
        const t =event.target.closest('.td').nextSibling.firstChild.innerText;
        console.log(t)
        // console.log(orderNumber);
        //
        // const n = this.$store.commit('main/SET_FAVORITE_OPPOSITE', orderNumber);
        console.log(parseInt(t));
        event.target.className = 'favourites-filled-star-symbol-copy';
        event.target.src =
          'data:image/png;base64,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'
        console.log(event.target.className);
      }
    },

    computed:  {
      ...mapState([
        'ideaList',
      ]),

      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
      })
    }
  };
</script>

<style src="./ideaList.css" scoped>

</style>