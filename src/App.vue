<template>
    <div id="app">
        <router-view/>
        <Alert />
        <Confirm />
    </div>
</template>

<script>
    import Alert from '@/components/common/modal/Alert';
    import Confirm from '@/components/common/modal/Confirm';

    export default {
        name: "App",
        components: {Confirm, Alert},
    }
</script>

<style scoped>
    @import "./assets/css/reset.css";
    @import "./assets/css/common.css";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center;
        min-width: 1300px;
    }
</style>
