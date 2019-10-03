<template>
    <Layout>
        <template v-slot:body>
            <div class="idea-detail-wrap-include-move-button">
                <div v-show="showPrevButton" class="prev-button-wrap" @click="movePrevIdeaDetail">
                    <button @mouseover="isHoverPrevButton = true" @mouseleave="isHoverPrevButton = false">
                        <img v-if="!isHoverPrevButton" class="prev-button-image" src="@/assets/img/prev_button_icon.png"/>
                        <img v-if="isHoverPrevButton" class="prev-button-image" style="transform: rotate(180deg)" src="@/assets/img/prev_button_icon_hover.png"/>
                    </button>
                </div>

                <div class="idea-detail-wrap">
                    <IdeaDetailHeader :idea="idea"></IdeaDetailHeader>
                    <EditorViewer :viewerText="idea.content"></EditorViewer>
                    <div class="tag-group-container" v-show="tags.length > 0">
                        <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                        <TagGroup :allTags="tags" :isDetailView="true"></TagGroup>
                    </div>


                    <div v-if="showFile" class="file-upload-wrap">
                        <div class="file-upload-title-box">
                            <span class="file-upload-title-text">첨부파일</span>
                        </div>
                        <div v-show="hasFile" class="file-upload-has-file-wrap">
                            <div class="file-upload-has-file-text-box">
                                <span class="file-upload-has-file-text">{{ fileName }}</span>
                            </div>
                            <a :href="idea.file" :download="fileName" target="_blank" class="file-upload-has-file-download-icon-box">
                                <img src="@/assets/img/icon_download.png" class="file-upload-has-file-download-icon"/>
                            </a>
                        </div>
                        <div v-show="!hasFile">
                            <div class="no-file-wrap">
                                <span class="no-file-text">첨부파일이 없습니다.</span>
                            </div>
                        </div>
                    </div>

                    <button class="idea-detail-move-list-button" @click="moveSession">
                        <span class="idea-detail-move-list-button-span">목록으로</span>
                    </button>
                </div>

                <div v-show="showNextButton" class="next-button-wrap" @click="moveNextIdeaDetail">
                    <button @mouseover="isHoverNextButton = true" @mouseleave="isHoverNextButton = false">
                        <img v-if="!isHoverNextButton" class="next-button-image" style="transform: rotate(180deg)" src="@/assets/img/prev_button_icon.png"/>
                        <img v-if="isHoverNextButton" class="next-button-image" src="@/assets/img/prev_button_icon_hover.png"/>
                    </button>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import EditorViewer from '@/components/idea/detail/EditorViewer';
    import IdeaDetailHeader from '@/components/idea/detail/IdeaDetailHeader';
    import {ACTIONS, GETTERS} from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    import {getFileName} from '@/utils/file';
    import {PERIOD_TYPE} from '@/consts/periodType';
    const { mapActions, mapGetters } = createNamespacedHelpers('main');

    export default {
        name: "IdeaDetail",
        components: {IdeaDetailHeader, EditorViewer, TagGroup, Layout},
        data() {
            return {
                ideaId: this.$route.params.ideaId,
                idea: {},
                isHoverPrevButton: false,
                isHoverNextButton: false
            }
        },

        computed: {
            ...mapGetters({
                nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,
                ideaList: GETTERS.GET_LIST,
            }),

            hasFile() {
                return this.idea.file;
            },

            fileName() {
                return getFileName(this.idea.file);
            },

            tags() {
                return this.idea.tags.map(tag => {
                    return {
                        ...tag,
                        state: true
                    }
                });
            },

            showPrevButton() {
                const ideaIndex = this.ideaList.findIndex(idea => idea.ideaId === this.idea.ideaId);
                return ideaIndex !== -1 && ideaIndex !== this.ideaList.length - 1;
            },
            showNextButton() {
                const ideaIndex = this.ideaList.findIndex(idea => idea.ideaId === this.idea.ideaId);
                return ideaIndex > 0;
            },

            showFile() {
                return this.nowPeriodType === PERIOD_TYPE.IDEA_CHECK || this.nowPeriodType === PERIOD_TYPE.TEAM_BUILDING;
            }
        },

        methods: {
            ...mapActions({
                getIdea: ACTIONS.GET_IDEA,
            }),

            movePrevIdeaDetail() {
                const ideaIndex = this.ideaList.findIndex(idea => idea.ideaId === this.idea.ideaId);
                const prevIdeaId = this.ideaList[ideaIndex + 1].ideaId;

                this.$router.push({path:`/session/${this.$store.state.main.session.sessionNumber}/idea/${prevIdeaId}`});
                this.ideaId = prevIdeaId;
                this.getIdeaDetail();
            },

            moveNextIdeaDetail() {
                const ideaIndex = this.ideaList.findIndex(idea => idea.ideaId === this.idea.ideaId);
                const nextIdeaId = this.ideaList[ideaIndex - 1].ideaId;

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
        min-height: 837px;
        margin-left: 70px;
        display: flex;
    }

    .idea-detail-wrap {
        width: 1200px;
        margin-left: 70px;
    }

    .prev-button-wrap {
        position: fixed;
        margin-top: 343px;
    }

    .prev-button-image {
        width: 64px;
        height: 64px;
        object-fit: contain;
    }

    .next-button-wrap {
        position: fixed;
        margin-top: 343px;
        margin-left: 50px;
        width: 2520px;
    }

    .next-button-image {
        width: 64px;
        height: 64px;
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

    .file-upload-wrap {
        width: 100%;
        height: 130px;
        margin-top: 60px;
        text-align: left;
    }

    .file-upload-title-box {
        width: 72px;
        height: 29px;
    }

    .file-upload-title-text {
        font-family: NotoSansCJKkr;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #000000;
    }

    .file-upload-has-file-wrap {
        width: 280px;
        height: 57px;
        margin-top: 30px;
        border-radius: 6px;
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
        display: flex;
    }

    .file-upload-has-file-text-box {
        width: 177px;
        height: 24px;
        margin: 17px 0px 16px 20px;
        text-align: left;
    }

    .file-upload-has-file-text {
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.48px;
        color: #000000;
    }

    .file-upload-has-file-download-icon-box {
        height: 20px;
        width: 20px;
        margin: 16px 16px 21px auto;
        ackground-color: #9b9b9b;
    }

    .file-upload-has-file-download-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .no-file-wrap {
        margin-top: 30px;
        width: 136px;
        height: 24px;
    }

    .no-file-text {
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.48px;
        color: #9b9b9b;
    }
</style>
