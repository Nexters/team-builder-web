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
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "IdeaEditor",
        components: {'editor': Editor},
        props: {
            idea: {
                type: Object,
                required: true
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
                },
            }
        },

        methods: {
            ...mapActions({
                createNewIdea: ACTIONS.CREATE_NEW_IEDA,
            }),

            onClickWriteFinish() {
                this.createNewIdea({
                    content: this.editorText,
                    // file: '',
                    sessionId: this.$store.state.main.session.sessionId,
                    tags: [],
                    title: this.ideaTitle,
                    type: this.$store.getters.isAdmin ? '' : 'IDEA',
                })
                .then(res => {
                    const ideaId = res.data.ideaId;
                    this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${ideaId}`});
                })
                .catch(err => console.log(err));
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

        created() {

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