<template>
    <div class="tui-editor-viewer-wrap">
        <viewer
                :value="viewerText"
                height="500px"
        />
    </div>
</template>

<script>
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'highlight.js/styles/github.css';
    import { Viewer } from '@toast-ui/vue-editor'

    export default {
        name: "EditorViewer",
        components: {
            'viewer': Viewer
        },
        data() {
            return {
                viewerText: '아이디어 내용이 표시됩니다.',
            }
        },

        mounted() {
        }
    }
</script>

<style scoped>
    .tui-editor-viewer-wrap {
        border-radius: 6px;
        border: solid 1px #eeeeee;
        background-color: #ffffff;
        min-height: 370px;

        font-family: NotoSansCJKkr;
        padding: 20px;
        text-align: left;
    }
</style>