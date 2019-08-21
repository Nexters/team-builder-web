<template>
    <div class="board">
        <div v-for="idea in ideaListResult" :key="idea.orderNumber"  @click="$emit('goDetail', idea.ideaId)">
            <!-- NOTICE -->
            <div v-if="idea['type'] === 'NOTICE'" class="Rectangle list" style="border: solid 1.5px #dbdbdb;">
                <!-- idea type -->
                <img src="@/assets/img/NOTICE.png"
                     class="notice" />
                <!-- order-number -->
                <div class="order-number">
                    -
                </div>
                <!-- idea-name-->
                <div class="idea-name">
                    {{ idea['title'] }}
                </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 37px; width: 327px; position: relative;">
                </div>
                <!-- position -->
                <div class="position" style="text-align: center">
                    -
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

            <!-- IDEA -->
            <div v-else class="Rectangle list">
                <!-- favorite -->
                <div class="favorite">
                    <img v-show="idea['favorite'] === true" @click="clickFavorite(idea.ideaId)"
                         src="@/assets/img/favourites-filled-star-symbol-copy@2x.png"
                         class="favourites-filled-star-symbol-copy" />
                    <img v-show="idea['favorite'] === false" @click="clickFavorite(idea.ideaId)"
                         src="@/assets/img/favourites-filled-star-symbol@2x.png"
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
                <div class="td" style="margin: 17px 0 17px 12px; width: 327px; height: 40px; position: relative;">
                    <div class="tags" v-for="(element, index) in idea['tags']" v-if="index < 3"
                         v-on:mouseover="viewAllTags" v-on:mouseout="closeAllTags">
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
                <!-- 투표 이미지 -->
                <div v-show="nowPeriodType === 'IDEA_VOTE'" class="idea-button">
                    <img src="../../../assets/img/group@2x.png"
                         v-show="inSelectedIdeas(idea.ideaId)" @click="clickIdea(idea.ideaId)">
                    <img src="../../../assets/img/idea-minus.png"
                         v-show="!inSelectedIdeas(idea.ideaId)" @click="clickIdea(idea.ideaId)">
                </div>
                <!-- 선정 이미지 -->
                <div v-show="nowPeriodType === 'IDEA_CHECK'" class="selection">
                    <img src="@/assets/img/selection.png" v-show="idea['selected']">
                    <img src="@/assets/img/non-selection.png" v-show="!idea['selected']">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaListVoteAndCheck",

    methods: {
      viewAllTags(event) {
        const popUp = event.target.closest('.td').lastChild;
        if(popUp.className) {
          popUp.style.display = 'flex';
        }
      },

      closeAllTags(event) {
        const popUp = event.target.closest('.td').lastChild;
        if(popUp.className) {
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
        if(position === 'DEVELOPER') {
          return '개발자';
        }
        return '디자이너';
      },

      clickIdea(id) {
        return this.$store.commit('main/CLICK_IDEAS', id);
      },

      inSelectedIdeas(id) {
        return this.$store.state.main.candidateIdeas.findIndex(idea => (idea.ideaId === id)) <= -1;
      },

    },

    computed:  {
      ...mapState([
        'ideaList',
      ]),

      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
        nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,

      }),
    }
  }
</script>

<style src="./IdeaListVoteAndCheck.css" scoped>

</style>