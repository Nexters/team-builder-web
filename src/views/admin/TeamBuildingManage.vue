<template>
    <Layout>
        <template v-slot:session-info>
            <Session></Session>
        </template>
        <template v-slot:body>

        </template>
    </Layout>
</template>

<script>
    import Layout from "../../components/common/layout/Layout";
    import Session from "../../components/admin/manage/Session";

    export default {
        name: "TeamBuildingManage",
        components: {Session, Layout},
        created() {
            console.log('1232414')
        }
    }
</script>

<style scoped>

</style>
