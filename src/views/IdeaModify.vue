<template>
    <Layout>
        <template v-slot:body>
            <div class="new-idea-wrap">
                <IdeaEditor :idea="idea" style="margin-top: 66px;"></IdeaEditor>

                <div class="tag-group-container">
                    <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                    <div class="tag-group-message-hint">함께 일하고 싶은 팀원의 포지션을 선택해주세요. 최대 5개 까지의 태그를 선택할 수 있어요.</div>
                    <TagGroup :tags="tags"></TagGroup>
                </div>

                <div class="file-upload-wrap">
                    <div class="file-upload-title-box">
                        <span class="file-upload-title-text">첨부파일</span>
                    </div>
                    <div class="file-upload-message-box">
                        <span class="file-upload-message-text">아이디어 선정자는 발표용 파일을 첨부해주세요.</span>
                    </div>
                    <div class="file-upload-button-box">
                        <label for="file-upload" class="file-upload-button-label">
                            <span class="file-upload-button-text">파일첨부하기</span>
                        </label>
                        <input id="file-upload" type="file" class="file-upload-button" />
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import IdeaEditor from '@/components/idea/new/IdeaEditor';
    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "IdeaModify",
        components: {Layout, IdeaEditor, TagGroup},
        data() {
            return {
                idea: {
                    ideaTitle: '',
                    editorText: '',
                },
                tags: []
            }
        },

        computed: {
            allTags() {
                return this.$store.state.main.session.tags;
            },

            availableEditIdea() {
                return this.isAdmin || this.isOwner;
            },

            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            isOwner() {
                return this.$store.getters.getUuid === this.idea.author.uuid;
            }
        },

        methods: {
            ...mapActions({
                getIdea: ACTIONS.GET_IDEA,
            }),

            getIdeaDetail(ideaId) {
                this.getIdea(ideaId)
                    .then(res => {
                        this.idea = {
                            ...res.data,
                            ideaTitle: res.data.title,
                            editorText: res.data.content,
                        };
                        this.tags = res.data.tags;

                        if (!this.availableEditIdea) {
                            this.$alert('접근권한이 없습니다.', '아이디어 수정', {
                                    confirmButtonText: '확인'
                                }
                            );
                            this.$router.push({path: '/'});
                        }
                    })
                    .catch(err => console.log(err));
            }
        },

        created() {
            this.getIdeaDetail(this.$route.params.ideaId);
        }
    }
</script>

<style scoped>
    .new-idea-wrap {
        width: 1200px;
        min-height: 837px;
        margin-left: 70px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-container {
        width: 100%;
        margin: 50px 0px 44px 0px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-message {
        width: 217px;
        height: 29px;
        font-size: 20px;
        letter-spacing: 0.5px;
        color: #000000;
    }

    .tag-group-message-hint {
        text-align: left;
        width: 496px;
        height: 20px;
        margin: 4px 0px 40px 0px;
        font-size: 14px;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }

    .file-upload-wrap {
        width: 100%;
        height: 140px;
        margin-bottom: 69px;
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

    .file-upload-message-box {
        width: 264px;
        height: 20px;
        margin-top: 4px;
    }

    .file-upload-message-text {
        font-family: NotoSansCJKkr;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }

    .file-upload-button-box {
        width: 280px;
        height: 57px;
        margin-top: 30px;
        border-radius: 6px;
        background-color: #273ea5;
    }

    .file-upload-button-label {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .file-upload-button-text {
        width: 107px;
        height: 29px;
        font-family: NotoSansCJKkr;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #ffffff;
    }

    .file-upload-button {
        display: none;
    }

</style>