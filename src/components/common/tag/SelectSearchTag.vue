<template>
    <!--<Layout>-->
    <!--<template v-slot:body>-->
    <transition name="modal">
        <div class="mask">
            <div class="container">
                <div class="Rectangle">
                    <!--onclick-->
                    <div class="x-img" v-on:click="$emit('close')">
                        <img src="../../../assets/img/group-4@2x.png" class="Group-4">
                    </div>
                    <div class="title">태그검색</div>
                    <div class="section">
                        <TagGroup :tags="allTags"></TagGroup>
                    </div>
                    <button class="search"><span>검색하기</span></button>
                    <!--onclick-->
                    <div class="selection-initialization" onclick="initSelect">선택초기화</div>
                </div>
            </div>
        </div>
    </transition>

    <!--</template>-->
    <!--</Layout>-->
</template>

<script>
  import TagGroup from "@/components/common/tag/TagGroup";
  import Layout from "@/components/common/layout/Layout";
  import {TAG_TYPE} from '@/consts/Tag';
  import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');

  export default {
    name: "SelectSearchTag",
    components: {Layout, TagGroup},
    data() {
      return {
        // allTags: [
        //   {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
        //   {id: 2, name: '최대다섯자', type: TAG_TYPE.DISABLED},
        //   {id: 3, name: '최대다섯자', type: TAG_TYPE.DISABLED},
        //   {id: 4, name: '최대다섯자', type: TAG_TYPE.DISABLED},
        //   {id: 5, name: '디자이너용', type: TAG_TYPE.DESIGNER},
        //   {id: 6, name: 'GUI', type: TAG_TYPE.DESIGNER},
        //   {id: 7, name: 'UX', type: TAG_TYPE.DESIGNER},
        //   {id: 8, name: '개발자전용', type: TAG_TYPE.DEVELOPER},
        //   {id: 9, name: '서버개발자', type: TAG_TYPE.DEVELOPER},
        //   {id: 10, name: '웹개발자', type: TAG_TYPE.DEVELOPER},
        //   {id: 11, name: 'iOS', type: TAG_TYPE.DEVELOPER},
        //   {id: 12, name: 'Android', type: TAG_TYPE.DEVELOPER},
        // ]
      }
    },

    computed: {
      ...mapGetters({
        allTags: GETTERS.GET_TAGS
      })

    },

    methods: {
      initSelect() {
        return this.$store.commit('main/SET_INIT_SELECTED_TAGS');
      }

    }
  }
</script>

<style scoped>
    .mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }

    .container {
        width: 1200px;
        text-align: center;
        vertical-align: middle;
    }

    .Rectangle {
        width: 716px;
        height: 473px;
        border-radius: 6px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
        background-color: #ffffff;
        padding: 29px 18px 40px 34px;
        margin: 231px 197px 233px 197px;

        transition: all .3s ease;
    }

    .title {
        width: 79px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.66px;
        color: #000000;
        margin-top: 5px;
    }

    .x-img {
        width: 42px;
        height: 42px;
        float: right;
        cursor: pointer;
        padding: 11px 15px 11px 7px;
    }

    .search {
        width: 240px;
        height: 64px;
        border-radius: 6px;
        background-color: #ff5000;
        margin-top: 44px;
        margin-left: 200px;
        margin-right: 120px;
        cursor: pointer;
    }

    .selection-initialization {
        width: 73px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.73px;
        color: #9b9b9b;
        text-decoration: underline;
        margin-right: 16px;
        display: inline-block;
        float: right;
        margin-top: 82px;
        cursor: pointer;
    }

    .Group-4 {
        object-fit: contain;
        width: 20px;
        height: 20px;
    }

    span {
        width: 77px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .section {
        margin-top: 56px;
    }

</style>