<template>
    <Layout>
        <template v-slot:body>
            <div class="idea-detail-wrap">
                <TagGroup></TagGroup>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    export default {
        name: "IdeaDetail",
        components: {TagGroup, Layout}
    }
</script>

<style scoped>
    .idea-detail-wrap {
        width: 1200px;
        margin-left: 70px;
    }
</style>