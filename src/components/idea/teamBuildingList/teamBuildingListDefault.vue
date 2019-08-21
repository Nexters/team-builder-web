<template>
    <div class="board">
        <div v-for="idea in ideaListResult" :key="idea.orderNumber">
            <!-- IDEA -->
            <div class="Rectangle list">
                <div class="half-line">
                <!-- idea-name-->
                <div class="idea-name"  @click="$emit('goDetail', idea.ideaId)">
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
                    {{ idea['createdAt'] | formatDate }}
                </div>
                <!-- 첨부 이미지 -->
                <img src="@/assets/img/attached_file.png" class="attached" v-show="idea['file']">
                <img src="@/assets/img/unattached_file.png" class="attached" v-show="!idea['file']">
                </div>
                <div style="height: 59.5px; width: 100%;">
                    <div class="member">팀원 {{ }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import moment from 'moment';

  import {GETTERS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapGetters} = createNamespacedHelpers('main');

  export default {
    name: "teamBuildingListDefault",
    computed:  {
      ...mapGetters({
        ideaListResult: GETTERS.GET_LIST,
        nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,
      }),
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
    }
  }

  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(value).format('YYYY.MM.DD')
    }
  })
</script>

<style src="./teamBuildingList.css" scoped>

</style>