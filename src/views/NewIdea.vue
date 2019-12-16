<template>
    <Layout>
        <template v-slot:body>
            <div class="new-idea-wrap">
                <IdeaEditor :idea="idea" style="margin-top: 66px;" :selectedTags="selectedTags"></IdeaEditor>

                <div v-if="!$store.getters.isAdmin" class="tag-group-container">
                    <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                    <div class="tag-group-message-hint">함께 일하고 싶은 팀원의 포지션을 선택해주세요. 최대 5개 까지의 태그를 선택할 수 있어요.  개발자태그는 그린박스, 디자이너태그는 옐로우박스예요.</div>
                    <TagGroup :allTags="allTags" :fetchSelectedTags="fetchSelectedTags"></TagGroup>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import IdeaEditor from '@/components/idea/new/IdeaEditor';
    import {createNamespacedHelpers} from 'vuex';
    const { mapState } = createNamespacedHelpers('main');

    window.tg = TagGroup;

    export default {
        name: "NewIdea",
        components: {Layout, IdeaEditor, TagGroup},
        data() {
            return {
                idea: {
                    ideaTitle: '',
                    editorText: '',
                },
                selectedTags: []
            }
        },

        computed: {
            ...mapState({
                allTags: state => state.session.tags,
            }),
        },

        methods: {
            fetchSelectedTags(selectedTags) {
                this.selectedTags = selectedTags.slice();
            }
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
        margin: 50px 0px 0px 0px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-message {
        text-align: left;
        height: 29px;
        font-size: 20px;
        letter-spacing: -.5px;
        color: #000;
        margin-bottom: 30px;
    }

    .tag-group-message-hint {
        text-align: left;
        width: 100%;
        height: 20px;
        margin: 4px 0px 40px 0px;
        font-size: 14px;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }
</style>
