<template>
    <transition name="modal">
        <div class="mask">
            <div class="container">
                <div class="Rectangle">
                    <div class="x-img" v-on:click="$emit('close')">
                        <img src="../../../assets/img/group-4@2x.png" class="Group-4">
                    </div>
                    <div class="title">태그검색</div>
                    <div class="section">
                        <TagGroup :allTags="allTags" :selectedTags="selectedTags" :fetchSelectedTags="fetchSelectedTags"></TagGroup>
                    </div>
                    <button class="search" @click="doSearch()"><span>검색하기</span></button>
                    <div class="selection-initialization" @click="initSelect">선택초기화</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import TagGroup from "@/components/common/tag/TagGroup";
  import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
  import {createNamespacedHelpers} from 'vuex';
  const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');

  export default {
    name: "SelectSearchTag",
    components: {TagGroup},
    data() {
      return {
          selectedTags: []
      }
    },

    computed: {
        allTags() {
            const allTagsCopy = JSON.parse(JSON.stringify(this.$store.state.main.session.tags));
            return allTagsCopy.map(tag => {

                //TODO: 이미 검색한 태그 그대로 유지
                // if (this.idea.tags.find(selectedTag => selectedTag.tagId === tag.tagId)) {
                //     return {
                //         ...tag,
                //         state: true
                //     };
                // }
                return {...tag};
            })
        },
    },

    methods: {
      initSelect() {
        return this.$store.commit('main/SET_INIT_SELECTED_TAGS');
      },

    fetchSelectedTags(selectedTags) {
        this.selectedTags = selectedTags.slice();
    },

        doSearch() {
            if (this.selectedTags.length < 1) {
                this.$emit('close');
            }
            this.$store.commit('main/SELECT_TAG', this.selectedTags);
            this.$emit('searchTags');
        }
    },

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
        height: 404px;
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
