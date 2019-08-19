<template>
    <Layout>
        <template v-slot:body>
            <div class="idea-detail-wrap-include-move-button">
                <button class="prev-button" @click="movePrevIdeaDetail"><img class="prev-button-image" src="@/assets/img/prev_button_icon.png"/></button>

                <div class="idea-detail-wrap">
                    <IdeaDetailHeader></IdeaDetailHeader>
                    <EditorViewer></EditorViewer>
                    <div class="tag-group-container">
                        <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                        <TagGroup :tags="tags"></TagGroup>
                    </div>
                    <button class="idea-detail-move-list-button">
                        <span class="idea-detail-move-list-button-span">목록으로</span>
                    </button>
                </div>

                <button class="next-button" @click="moveNextIdeaDetail"><img class="next-button-image" src="@/assets/img/next_button_icon.png"/></button>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import {TAG_TYPE} from '@/consts/Tag';
    import EditorViewer from '@/components/idea/detail/EditorViewer';
    import IdeaDetailHeader from '@/components/idea/detail/IdeaDetailHeader';
    export default {
        name: "IdeaDetail",
        components: {IdeaDetailHeader, EditorViewer, TagGroup, Layout},
        data() {
            return {
                tags: [
                    {id: 1, name: 'GUI', type: TAG_TYPE.DESIGNER},
                    {id: 1, name: 'UX', type: TAG_TYPE.DESIGNER},
                    {id: 1, name: '개발자전용', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: '서버개발자', type: TAG_TYPE.DEVELOPER},
                    {id: 1, name: '웹개발자', type: TAG_TYPE.DEVELOPER},
                ],

                ideaId: this.$route.params.ideaId,
            }
        },

        methods: {
            movePrevIdeaDetail() {
                this.$router.push({name: 'IdeaDetail', params: {ideaId: Number(this.ideaId) - 1}});
            },

            moveNextIdeaDetail() {
                this.$router.push({name: 'IdeaDetail', params: {ideaId: Number(this.ideaId) + 1}});
            }
        }
    }
</script>

<style scoped>
    /* 이전/다음 아이디어 버튼 영역 포함 */
    .idea-detail-wrap-include-move-button {
        width: 1340px;
        margin-left: 70px;
        display: flex;
    }

    .idea-detail-wrap {
        width: 1200px;
    }

    .prev-button {
        margin-top: 343px;
        margin-right: 50px;
        width: 20px;
        height: 40px;
    }

    .prev-button-image {
        width: 20px;
        height: 40px;
        object-fit: contain;
    }

    .next-button {
        margin-top: 343px;
        margin-left: 50px;
        width: 20px;
        height: 40px;
    }

    .next-button-image {
        width: 20px;
        height: 40px;
        object-fit: contain;
    }

    .tag-group-container {
        width: 100%;
        margin: 50px 0px 0px 0px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-message {
        width: 217px;
        height: 29px;
        margin-bottom: 30px;
        font-size: 20px;
        letter-spacing: 0.5px;
        color: #000000;
    }

    .idea-detail-move-list-button {
        width: 200px;
        height: 57px;
        margin: 14px 0px 143px 1000px;
        border-radius: 6px;
        background-color: #273ea5;
    }

    .idea-detail-move-list-button-span {
        width: 63px;
        height: 27px;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }
</style>