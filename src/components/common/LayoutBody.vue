<template>
    <div class="layout-body">
        <SessionInfo></SessionInfo>
        <div class="border-line"></div>
        <IdeaSection></IdeaSection>
        <div class="i"></div>
    </div>
</template>

<script>
    import IdeaSection from '@/components/idea/IdeaSection';
    import SessionInfo from '@/components/common/sessionInfo/SessionInfo';
    export default {
        name: "LayoutBody",
        components: {SessionInfo, IdeaSection}
    }
</script>

<style scoped>
    .layout-body {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>