<template>
    <Layout>
        <template v-slot:body>
            <div class="new-idea-wrap">
                <NewIdeaHeader style="margin-top: 66px;"></NewIdeaHeader>
                <Editor style="margin-top: 48px;"></Editor>
                <div class="tag-group-container">
                    <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                    <div class="tag-group-message-hint">함께 일하고 싶은 팀원의 포지션을 선택해주세요. 최대 5개 까지의 태그를 선택할 수 있어요.</div>
                    <TagGroup :tags="allTags"></TagGroup>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import Editor from '@/components/idea/new/Editor';
    import NewIdeaHeader from '@/components/idea/new/NewIdeaHeader';
    import {TAG_TYPE} from '@/consts/Tag';
    export default {
        name: "NewIdea",
        components: {Layout, NewIdeaHeader, Editor, TagGroup},
        data() {
            return {
            }
        },

        computed: {
            allTags() {
                return this.$store.state.main.session.tags;
            }
        }
    }
</script>

<style scoped>
    .new-idea-wrap {
        width: 1200px;
        margin-left: 70px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-container {
        width: 100%;
        margin: 50px 0px;
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
</style>