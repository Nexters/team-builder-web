<template>
    <div id="app">
        <router-view/>
        <Alert />
    </div>
</template>

<script>
    import Alert from '@/components/common/modal/Alert';

    export default {
        name: "App",
        components: {Alert},
    }
</script>

<style scoped>
    @import "./assets/css/reset.css";
    @import "./assets/css/common.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
    }
</style>
