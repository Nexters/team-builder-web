<template>
    <div class="layout-body">
        <div class="main-info"></div>
        <div class="border-line"></div>
        <IdeaSection></IdeaSection>
        <div class="i"></div>
    </div>
</template>

<script>
    import IdeaSection from '@/components/idea/IdeaSection';
    export default {
        name: "LayoutBody",
        components: {IdeaSection}
    }
</script>

<style scoped>
    .layout-body {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .main-info {
        height: 400px;
        background-color: white;
    }

    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>