<template>
    <Layout>
        <template v-slot:session-info>
            <SessionInfo></SessionInfo>
        </template>
        <div class="border-line"></div>
        <template v-slot:body>
            <IdeaSection></IdeaSection>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import SessionInfo from '@/components/common/sessionInfo/SessionInfo';
    import IdeaSection from '@/components/idea/IdeaSection';
    export default {
        name: "Main",
        components: {IdeaSection, SessionInfo, Layout}
    }
</script>

<style scoped>
    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>