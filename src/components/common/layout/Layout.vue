<template>
    <div class="layout-container" v-loading.fullscreen.lock="loading">
        <template v-if="!loading">
            <LayoutGnb></LayoutGnb>
            <LayoutHeader></LayoutHeader>
            <div class="border-line"></div>

            <slot></slot>

            <LayoutFooter></LayoutFooter>
        </template>
    </div>
</template>

<script>
    import LayoutGnb from '@/components/common/layout/LayoutGnb';
    import LayoutHeader from '@/components/common/layout/LayoutHeader';
    import LayoutFooter from '@/components/common/layout/LayoutFooter';

    import { ACTIONS } from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "Layout",
        components: {LayoutGnb, LayoutHeader, LayoutFooter},
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
        overflow: hidden;
        margin: 0px;
        padding: 0px;

    }

    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }
</style>