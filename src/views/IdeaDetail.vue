<template>
    <Layout>
        <template v-slot:body>
            <div class="idea-detail-wrap-include-move-button">
                <button class="prev-button" @click="movePrevIdeaDetail"><img class="prev-button-image" src="@/assets/img/prev_button_icon.png"/></button>

                <div class="idea-detail-wrap">
                    <IdeaDetailHeader :idea="idea"></IdeaDetailHeader>
                    <EditorViewer :viewerText="idea.content"></EditorViewer>
                    <div class="tag-group-container" v-show="tags.length > 0">
                        <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                        <TagGroup :tags="tags"></TagGroup>
                    </div>
                    <button class="idea-detail-move-list-button" @click="moveSession">
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
    import EditorViewer from '@/components/idea/detail/EditorViewer';
    import IdeaDetailHeader from '@/components/idea/detail/IdeaDetailHeader';
    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "IdeaDetail",
        components: {IdeaDetailHeader, EditorViewer, TagGroup, Layout},
        data() {
            return {
                tags: [],
                ideaId: this.$route.params.ideaId,
                idea: {}
            }
        },

        methods: {
            ...mapActions({
                getIdea: ACTIONS.GET_IDEA,
            }),

            movePrevIdeaDetail() {
                const prevIdeaId = Number(this.ideaId) - 1; //TODO: 검색된 목록에서 가져와야함

                this.$router.push({path:`/session/${this.$store.state.main.session.sessionNumber}/idea/${prevIdeaId}`});
                this.ideaId = prevIdeaId;
                this.getIdeaDetail();
            },

            moveNextIdeaDetail() {
                const nextIdeaId = Number(this.ideaId) + 1; //TODO: 검색된 목록에서 가져와야함

                this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${nextIdeaId}`});
                this.ideaId = nextIdeaId;
                this.getIdeaDetail();
            },

            moveSession() {
                this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}`});
            },

            getIdeaDetail() {
                this.getIdea(this.ideaId)
                    .then(res => {
                        this.idea = res.data;
                        this.tags = this.idea.tags;
                    })
                    .catch(err => console.log(err));
            }
        },

        created() {
            this.getIdeaDetail();
        },
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