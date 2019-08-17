<template>
    <div class="tui-editor-wrap">
        <editor
                :options="editorOptions"
                mode="wysiwyg"
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
        hideModeSwitch: true,
    };

    export default {
        name: "TuiEditor",
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
    .tui-editor-wrap {
        text-align: left;
    }
</style>