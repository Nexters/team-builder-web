<template>
    <Layout>
        <MainBody></MainBody>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import MainBody from '@/components/common/main/MainBody';
    export default {
        name: "Main",
        components: {MainBody, Layout}
    }
</script>

<style scoped>

</style>