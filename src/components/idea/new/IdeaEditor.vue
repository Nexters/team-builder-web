<template>
    <div class="new-idea-header">
        <div style="display: flex">
            <div class="new-idea-title-wrap">
                <input class="new-idea-title-contents"
                       v-model.trim="ideaTitle"
                       placeholder="아이디어를 한문장으로 요약해주세요."
                       ref="ideaTitle"
                       maxlength="35"
                       :class="{'on-typing-title': !!ideaTitle}"
                />
                <div class="new-idea-title-border-line"></div>
            </div>
            <button class="new-idea-finish-button-wrap" @click="onClickWriteFinish">
                <span class="new-idea-finish-button">{{ idea.ideaId ? '수정완료' : '작성완료'}}</span>
            </button>
        </div>

        <div class="tui-editor-wrap">
            <editor
                    ref="tuiEditor"
                    v-model="editorText"
                    :options="editorOptions"
                    mode="wysiwyg"
                    height="370px"
            />
        </div>
    </div>
</template>

<script>
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import { Editor } from '@toast-ui/vue-editor';

    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    import {uploadFiles} from '@/api/FileAPI';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "IdeaEditor",
        components: {'editor': Editor},
        props: {
            idea: {
                type: Object,
                required: true
            },
            selectedTags: {
                type: Array,
            }
        },
        data() {
            return {
                ideaTitle: this.idea.ideaTitle,
                editorText: this.idea.editorText,
                editorOptions: {
                    minHeight: '400px',
                    language: 'ko_kr',
                    useCommandShortcut: true,
                    useDefaultHTMLSanitizer: true,
                    hideModeSwitch: true,
                    hooks: {
                        addImageBlobHook: function (fileOrBlob, callback) {
                            uploadFiles(fileOrBlob.name, fileOrBlob, 'idea')
                                .then(fileUrls => {
                                    callback(fileUrls[0], '');
                                })
                                .catch(err => {
                                    console.log(err);
                                    alert('이미지 업로드 실패');
                                });

                            return false;
                        }
                    }
                },
            }
        },

        methods: {
            ...mapActions({
                createNewIdea: ACTIONS.CREATE_NEW_IEDA,
                modifyIdea: ACTIONS.MODIFY_IEDA,
            }),

            onClickWriteFinish() {
                if (!this.ideaTitle) {
                    alert('제목을 작성해주세요'); //TODO 공통 modal로 노출
                    return;
                }

                const data = {
                    content: this.editorText,
                    file: this.idea.file,
                    sessionId: this.$store.state.main.session.sessionId,
                    tags: this.selectedTags.map(selectedTag => selectedTag.tagId),
                    title: this.ideaTitle,
                    type: this.$store.getters.isAdmin ? '' : 'IDEA',
                };

                //기존 아이디어 수정
                if (this.idea.ideaId) {
                    this.modifyIdea({
                        ...data,
                        ideaId: this.idea.ideaId
                    })
                    .then(res => {
                        const ideaId = res.data.ideaId;
                        this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${ideaId}`});
                    })
                }

                else {
                    //새 아이디어 생성
                    this.createNewIdea({
                        ...data
                    })
                    .then(res => {
                        const ideaId = res.data.ideaId;
                        this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${ideaId}`});
                    })
                    .catch(err => console.log(err));
                }
            },

            // TODO: 제목 입력값 제한 (영문 및 한글 byte 고려)
            // count(message) {
            //     let totalByte = 0;
            //     for (let index = 0, length = message.length; index < length; index++) {
            //         let currentByte = message.charCodeAt(index);
            //         (currentByte > 128) ? totalByte += 2 : totalByte++;
            //     }
            //     return totalByte;
            // }
        },

        mounted() {
            this.$refs.ideaTitle.focus();
        }
    }
</script>

<style scoped>
    .new-idea-header {
        display: flex;
        flex-direction: column;
    }

    .new-idea-title-wrap {
        width: 900px;
        height: 64px;
        text-align: left;
        border-radius: 6px;
    }

    .new-idea-title-contents {
        width: 900px;
        height: 45px;
        font-family: NotoSansCJKkr;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        margin: 9px auto 10px 0px;
        font-size: 30px;
        font-weight: 300;
        letter-spacing: -1px;
        color: #9b9b9b;
    }

    .on-typing-title {
        font-weight: normal;
        color: #000000;
    }

    .new-idea-title-border-line {
        width: 100%;
        height: 1px;
        background-color: #dbdbdb;
    }

    .new-idea-finish-button-wrap {
        width: 200px;
        height: 57px;
        margin: 3.5px 0px 3.5px 99px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .new-idea-finish-button {
        width: 63px;
        height: 27px;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }

    .tui-editor-wrap {
        margin-top: 48px;
        text-align: left;
    }
</style>
