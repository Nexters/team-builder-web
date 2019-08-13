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
        data() {
            return {
                tags: [
                    {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                    {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                    {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                    {id: 1, name: '최대다섯자', type: TAG_TYPE.DISABLED},
                    {id: 1, name: '디자이너용', type: TAG_TYPE.DESIGNER},
                    {id: 1, name: 'GUI', type: TAG_TYPE.DESIGNER},
                    {id: 1, name: 'UX', type: TAG_TYPE.DESIGNER},
                    {id: 1, name: '개발자전용', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: '서버개발자', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: '웹개발자', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: 'iOS', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: 'Android', type: TAG_TYPE.DEVELOPER},
                ]
            }
        }
    }
</script>

<style scoped>
    .tag-group-wrap {
        text-align: left;
    }
</style>