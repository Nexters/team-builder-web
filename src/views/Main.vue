<template>
    <Layout>
        <template v-slot:session-info>
            <SessionInfo></SessionInfo>
        </template>
        <div class="border-line"></div>
        <template v-slot:body>
            <idea-section v-if="!isAdmin"></idea-section>
            <admin-idea-list-section v-else-if="isAdmin"></admin-idea-list-section>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import SessionInfo from '@/components/common/sessionInfo/SessionInfo';
    import IdeaSection from '@/components/idea/IdeaSection';
    import AdminIdeaListSection from "@/components/idea/admin/AdminIdeaListSection";

    export default {
        name: "Main",
        components: {AdminIdeaListSection, IdeaSection, SessionInfo, Layout},
        computed: {
            isAdmin() {
                return this.$store.getters.isAdmin;
            }
        },
    }
</script>

<style scoped>
    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>