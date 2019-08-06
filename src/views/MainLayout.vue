<template>
    <div class="layout-container">
        <LayoutGnb></LayoutGnb>
        <LayoutHeader></LayoutHeader>
        <div class="border-line"></div>
        <LayoutBody></LayoutBody>
        <LayoutFooter></LayoutFooter>

    </div>
</template>

<script>
    import LayoutGnb from '@/components/common/LayoutGnb';
    import LayoutHeader from '@/components/common/LayoutHeader';
    import LayoutBody from '@/components/common/LayoutBody';
    import LayoutFooter from '@/components/common/LayoutFooter';
    export default {
        name: "Main",
        components: {LayoutGnb, LayoutHeader, LayoutBody, LayoutFooter},
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .layout-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0px;
        padding: 0px;

    }

    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>