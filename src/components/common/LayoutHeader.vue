<template>
    <div class="layout-header">
        <div class="header-contents-wrap"></div>
    </div>
</template>

<script>
    export default {
        name: "LayoutHeader"
    }
</script>

<style scoped>
    .layout-header {
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: center;
    }

    .header-contents-wrap {
        width: 1200px;
        height: 70px;
    }
</style>