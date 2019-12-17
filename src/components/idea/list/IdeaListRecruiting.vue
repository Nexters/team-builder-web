<template>
    <div class="board">
        <div class="info-text" v-if="this.ideaList.length === 0">
            아이디어가 없어요.<br/>
            첫 아이디어를 작성해보세요.
        </div>
        <div class="info-text" v-else-if="ideaListResult.length === 0">
            검색 결과가 없어요.
        </div>
        <div v-for="idea in ideaListResult" :key="idea.orderNumber">
            <!-- NOTICE -->
            <div v-if="idea['type'] === 'NOTICE'" class="Rectangle list type-notice">
                <!-- idea type -->
                <img src="@/assets/img/NOTICE.png"
                     class="notice" />
                <!-- order-number -->
                <div class="order-number">

                </div>
                <!-- idea-name-->
                <div class="idea-name-wrapper" @click="$emit('goDetail', idea.ideaId)">
                    <div class="idea-name notice-title">
                        {{ idea['title'] }}
                    </div>
                </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 34px; width: 327px; position: relative;">
                </div>
                <!-- position -->
                <div class="position" style="padding-left: 8px">

                </div>
                <!-- author -->
                <div class="author">
                    {{ idea['author'].name }}
                </div>
                <!-- created At -->
                <div class="created-at">
                    {{ idea['createdAt'] | formatDate }}
                </div>
            </div>

            <!-- IDEA -->
            <div v-else class="Rectangle list">
                <!-- favorite -->
                <div class="favorite">
                    <img v-show="idea['favorite'] === true" @click="clickFavorite(idea)"
                         src="@/assets/img/favourites-filled-star-symbol-copy@2x.png"
                         class="favourites-filled-star-symbol-copy">
                    <img v-show="idea['favorite'] === false" @click="clickFavorite(idea)"
                         src="@/assets/img/favourites-filled-star-symbol@2x.png"
                         class="favourites-filled-star-symbol" />
                </div>
                <!-- order-number -->
                <div class="order-number">
                    {{ idea['orderNumber'] }}
                </div>
                <!-- idea-name-->
                <div class="idea-name-wrapper" @click="$emit('goDetail', idea.ideaId)">
                    <div class="idea-name">
                        {{ idea['title'] }}
                    </div>
                </div>
                <!-- tags -->
                <div class="td" style="margin: 17px 0 17px 34px; width: 327px; height: 40px; position: relative;">
                    <div v-show="idea['tags'].length === 0" class="not-select-tags">
                        태그를 선택하지 않았어요.
                    </div>
                    <div v-show="idea['tags'].length > 0" class="tags" v-for="(element, index) in idea['tags']"
                         v-if="index < 3" v-on:mouseover="viewAllTags" v-on:mouseout="closeAllTags">
                        <table-tag
                                :name="element.name"
                                :type="element.type">
                        </table-tag>
                    </div>
                    <table-tag-pop-up
                                style="display: none"
                                v-if="idea['tags'].length > 3"
                                :all-tags="idea['tags']">
                    </table-tag-pop-up>
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
                    {{ idea['createdAt'] | formatDate }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';

  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  import TableTag from "@/components/common/tag/TableTag";
  import TableTagPopUp from "@/components/common/tag/TableTagPopUp";
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "IdeaListRecruiting",
    components: {TableTagPopUp, TableTag},
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

      clickFavorite(idea) {
        this.$store.dispatch('main/FAVORITE_CHANGE', {ideaId: idea.ideaId, isFavorite: idea.favorite});
      },

      positionFormat(position) {
        if (position === 'DEVELOPER') {
          return '개발자';
        }
        return '디자이너';
      },
    },

    data() {
      return {
        ideaList : this.$store.state.main.ideaList
      }
    },

    computed: {
      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
      }),
    }
  };

  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(value).format('YYYY.MM.DD')
    }
  })
</script>

<style src="./IdeaListRecruiting.css" scoped>

</style>
