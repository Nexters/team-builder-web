<!-- TO-DO column별로 정렬 기능 구현 -->
<!-- TO-DO 작성자 검색 기능 구현 -->
<template>
        <div class="board">
            <div class="Rectangle list" v-for="idea in ideaListResult" :key="idea.orderNumber">
                <!-- table column의 index, favorite이 0으로 시작 -->
                <!-- favorite -->
                    <div class="favorite">
                        <img v-if="idea['favorite'] === true" @click="clickFavorite(idea.ideaId)" src="../../../assets/img/favourites-filled-star-symbol-copy@2x.png"
                             class="favourites-filled-star-symbol-copy">
                        <img v-if="idea['favorite'] === false" @click="clickFavorite(idea.ideaId)" src="../../../assets/img/favourites-filled-star-symbol@2x.png"
                             class="favourites-filled-star-symbol" />
                    </div>
           <!-- order-number -->
                    <div class="order-number">
                        {{ idea['orderNumber'] }}
                    </div>
                <!-- idea-name-->
                    <div class="idea-name">
                        {{ idea['title'] }}
                    </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 37px; width: 327px; position: relative;">
                    <div class="tags" v-for="(element, index) in idea['tags']" v-on:mouseover="viewAllTags" v-on:mouseout="closeAllTags" v-if="index < 3">
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
                        {{ dateFormat(idea['createdAt']) }}
                    </div>
            </div>
        </div>
</template>

<script>
  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaList",
    model: {
      event: "change"
    },

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

      dateFormat(date) {
        const parsingStr = date.split('T')[0];
        const returnDate = parsingStr.split('-');
        return returnDate[0] + '. ' + returnDate[1] + '. ' + returnDate[2]
      },

      clickFavorite: function (id) {
        return this.$store.dispatch('main/FAVORITE_CHANGE', id);
      },

      positionFormat(position) {
        if (position === 'DEVELOPER') {
          return '개발자';
        }
        return '디자이너';
      },
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