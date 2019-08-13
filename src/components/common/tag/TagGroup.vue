<template>
    <div class="tag-group-wrap">
        <PositionTag v-for="tag in this.tags"
                     :id="tag.id"
                     :name="tag.name"
                     :type="tag.type">
        </PositionTag>
    </div>
</template>

<script>
    import PositionTag from '@/components/common/tag/PositionTag';
    import {TAG_TYPE} from '@/consts/TagType';
    export default {
        name: "TagGroup",
        components: {PositionTag},
        props: {
            tags: {
                type: Array,
                required: true
            }
        },
        data() {
            return { }
        }
    }
</script>

<style scoped>
    .tag-group-wrap {
        text-align: left;
    }
</style>