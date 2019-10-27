<template>
    <div class="tag-group-wrap">
        <div v-for="tag in this.allTagsCopy" @click="onClickTag({tag})" style="display: inline-block">
            <PositionTag
                     :tag-id="tag.tagId"
                     :name="tag.name"
                     :type="tag.type"
                     :state="tag.state">
            </PositionTag>
        </div>
    </div>
</template>

<script>
    import PositionTag from '@/components/common/tag/PositionTag';

    const SELECTED_TAGS_LIMIT_COUNT = 5;

    export default {
        name: "TagGroup",
        components: {PositionTag},
        props: {
            allTags: {
                type: Array,
                required: true
            },
            selectedTags: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            fetchSelectedTags: {
                type: Function
            },
            isDetailView: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                allTagsCopy: [],
                selectedTagsCopy: []
            }
        },
        methods: {
            /**
             * 태그 클릭시
             * @param tagId
             */
            onClickTag({tag}) {
                if (this.isDetailView) {
                    return;
                }

                /**
                 * 최대 선택갯수를 초과한 경우
                 */
                if (!tag.state && this.selectedTagsCopy.length >= SELECTED_TAGS_LIMIT_COUNT) {
                    this.$store.commit('common/showAlert', {alertMessage: '태그는 최대 5개까지 선택할 수 있어요.'});
                    return;
                }

                tag.state = !tag.state;

                const index = this.selectedTagsCopy.findIndex(selectedTag => selectedTag.tagId === tag.tagId);
                if (index === -1) {
                    this.selectedTagsCopy.push(tag);
                } else {
                    this.selectedTagsCopy.splice(index, 1);
                }
                this.fetchSelectedTags(this.selectedTagsCopy);
            }
        },

        created() {
            this.allTagsCopy = JSON.parse(JSON.stringify(this.allTags));
            this.selectedTagsCopy = JSON.parse(JSON.stringify(this.allTags.filter(tag => tag.state)));
        }
    }
</script>

<style scoped>
    .tag-group-wrap {
        text-align: left;
    }
</style>
