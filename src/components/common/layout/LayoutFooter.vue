<template>
    <div class="layout-footer">
        <div class="footer-contents-wrap"></div>
    </div>
</template>

<script>
    export default {
        name: "LayoutFooter"
    }
</script>

<style scoped>
    .layout-footer {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
    }

    .footer-contents-wrap {
        min-width: 1200px;
        height: 70px;
    }
</style>