<template>
    <div class="editor-wrap">
        <editor
            :options="editorOptions"
        />
    </div>
</template>

<script>
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import { Editor } from '@toast-ui/vue-editor';

    const defaultOptions = {
        minHeight: '400px',
        language: 'ko_kr',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        hideModeSwitch: false,
    };

    export default {
        name: "Editor",
        components: {
            'editor': Editor,
        },
        data() {
            return {
                editorOptions: defaultOptions,
            }
        }
    }
</script>

<style scoped>
    .editor-wrap {
        margin: 20px auto;
        width: 1200px;
    }
</style>