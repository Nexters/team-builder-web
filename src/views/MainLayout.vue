<template>
    <div class="layout-container" v-loading.fullscreen.lock="loading">
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

    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    const { mapActions } = createNamespacedHelpers('session');

    export default {
        name: "Main",
        components: {LayoutGnb, LayoutHeader, LayoutBody, LayoutFooter},
        data() {
            return {
                loading: true,
            }
        },
        methods: {
            ...mapActions({
                loadInitData: ACTIONS.LOAD_INIT_DATA,
            }),
        },
        created() {
            this.loadInitData()
                .then(() => this.loading = false)
                .catch(err => console.log(err)); //TODO 데이터 초기화 실패
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