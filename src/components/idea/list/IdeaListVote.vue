<template>
    <div class="board">
        <div class="Rectangle list" v-for="idea in ideaListResult" :key="idea.orderNumber">
            <!-- table column의 index, favorite이 0으로 시작 -->
            <!-- favorite -->
            <div class="td" style="padding: 25px 12px 25px 22px; width: 58px; height: 74px;">
                <div class="favorite">
                    <img v-if="idea['favorite'] === true" @click="clickFavorite(idea.id)" src="../../../assets/img/favourites-filled-star-symbol-copy@2x.png"
                         class="favourites-filled-star-symbol-copy">
                    <img v-if="idea['favorite'] === false" @click="clickFavorite(idea.id)" src="../../../assets/img/favourites-filled-star-symbol@2x.png"
                         class="favourites-filled-star-symbol" />
                </div>
            </div>
            <!-- order-number -->
            <div class="td" style="padding: 29px 7px 29px 12px; width: 49px">
                <div class="order-number">
                    {{ idea['orderNumber'] }}
                </div>
            </div>
            <!-- idea-name-->
            <div class="td" style="padding: 25px 15px 25px 7px; width: 451px;">
                <div class="idea-name">
                    {{ idea['title'] }}
                </div>
            </div>
            <!-- tags -->
            <div class="td" style="padding: 17px 0 17px 12px; width: 339px; height: 74px; position: relative;">
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
            <div class="td" style="padding: 25px 5px 25px 9px; width: 70px;">
                <div class="position">
                    {{ idea['author'].position }}
                </div>
            </div>
            <!-- author -->
            <div class="td" style="padding: 25px 5px; width: 66px;">
                <div class="author">
                    {{ idea['author'].name }}
                </div>
            </div>
            <!-- created At -->
            <div class="td" style="padding: 29px 13px 26px 5px; width: 98px;">
                <div class="created-at">
                    {{ format(idea['createdAt']) }}
                </div>

            </div>
            <div class="td" style="padding: 5px 22px 24px 13px; width: 65px; height: 74px;">
                <img src="../../../assets/img/group@2x.png" class="Group-2">
            </div>
        </div>
    </div>
</template>

<script>
  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaListVote",

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

      format(date) {
        const parsingStr = date.split(' ')[0];
        const returnDate = parsingStr.split('-');
        return returnDate[0] + '. ' + returnDate[1] + '. ' + returnDate[2]
      },

      clickFavorite: function (id) {
        return this.$store.dispatch('main/FAVORITE_CHANGE', id);
      }
    },

    computed:  {
      ...mapState([
        'ideaList',
      ]),

      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
      }),

      ...mapActions({

      })
    }
  }
</script>

<style src="./IdeaListVote.css" scoped>

</style>