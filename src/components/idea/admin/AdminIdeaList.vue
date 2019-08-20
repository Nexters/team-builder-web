<template>
    <div class="board">
        <b-form-group>
            <div v-for="idea in ideaListResult" :key="idea.orderNumber">
                <!-- NOTICE -->
                <div v-if="idea['type'] === 'NOTICE'" class="Rectangle list" style="border: solid 1.5px #dbdbdb;">
                    <!-- idea type -->
                    <img src="@/assets/img/NOTICE.png"
                         class="notice" />
                    <!-- idea-name-->
                    <div class="idea-name" style="margin-right: 152px;">
                        {{ idea['title'] }}
                    </div>
                    <!-- position -->
                    <div class="position">
                        &nbsp;-
                    </div>
                    <!-- author -->
                    <div class="author">
                        {{ idea['author'].name }}
                    </div>
                    <!-- created At -->
                    <div class="created-at">
                        {{ dateFormat(idea['createdAt']) }}
                    </div>
                    <!-- vote number-->
                    <div class="vote-number">
                        -
                    </div>
                    <!-- 선정 이미지 -->
                    <div class="selection">&nbsp;-</div>
                </div>
                <!-- IDEA -->
                <div v-else class="Rectangle list">
                    <!-- table column의 index, favorite이 0으로 시작 -->
                    <!-- idea type -->
                    <div class="custom-checkbox">
                        <b-form-checkbox
                                :value="idea.ideaId"
                                v-model="selected"
                                stacked
                        />
                    </div>
                    <!-- idea-name-->
                    <div class="idea-name">
                        {{ idea['title'] }}
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
                    <!-- vote number-->
                    <div class="vote-number">
                        {{ numberFormat(idea['voteNumber']) }}
                    </div>
                    <!-- 선정 이미지 -->
                    <img src="../../../assets/img/selection.png" class="selection" v-show="idea['selected']">
                    <img src="../../../assets/img/non-selection.png" class="selection" v-show="!idea['selected']">
                </div>
            </div>
        </b-form-group>
    </div>
</template>

<script>
  import {ACTIONS, GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

  export default {
    name: "AdminIdeaList",

    data() {
      return {
        allSelected: false,
        selected: [],
      }
    },

    methods: {
      dateFormat(date) {
        const parsingStr = date.split('T')[0];
        const returnDate = parsingStr.split('-');
        return returnDate[0] + '. ' + returnDate[1] + '. ' + returnDate[2]
      },

      positionFormat(position) {
        if(position === 'DEVELOPER') {
          return '개발자';
        }
        return '디자이너';
      },

      numberFormat(n) {
        return n > 9 ? "" + n : "0" + n;
      },

      clickIdea(id) {
        return this.$store.commit('main/CLICK_IDEAS', id);
      },

      inSelectedIdeas(id) {
        return this.$store.state.main.candidateIdeas.findIndex(idea => (idea.ideaId === id)) <= -1;
      },



    },

    computed:  {
      // ...mapState([
      //   'ideaList',
      // ]),

      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
      }),

      ...mapActions({

      })
    }
  }
</script>

<style src="./AdminIdeaList.css" scoped>

</style>