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
        props: {
            viewerText: {
                type: String,
                required: true
            },
        },
        data() {
            return {
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

        overflow-x: scroll;
        max-height: 400px;
    }
</style>
