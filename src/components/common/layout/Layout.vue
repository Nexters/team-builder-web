<template>
    <div class="layout-container" v-loading.fullscreen.lock="loading">
        <template v-if="!loading">
            <LayoutGnb></LayoutGnb>
            <LayoutHeader></LayoutHeader>
            <div class="border-line"></div>

            <div class="slot-wrap">
                <slot name="session-info"></slot> <!-- session 정보(하얀색), 없으면 미노출 -->
                <div class="slot-body-wrap" :style="{ minHeight: (innerHeight - diffHeight) + 'px' }">
                    <slot name="body"></slot> <!-- 회색 영역, 내부에서 width: 1200px; 지정 필요 -->
                </div>
            </div>

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
    import {RELOAD_AUTH} from '@/consts/userType';
    const { mapActions } = createNamespacedHelpers('main');

    export default {
        name: "Layout",
        components: {LayoutGnb, LayoutHeader, LayoutFooter},
        data() {
            return {
                loading: true,
                innerHeight: window.innerHeight
            }
        },

        computed: {
            diffHeight() {
                if (this.$route.name === 'Session') {
                    return 542;
                }
                return 141;
            }
        },

        methods: {
            ...mapActions({
                loadInitData: ACTIONS.LOAD_INIT_DATA,
            }),
        },
        created() {
            const sessionNumber = this.$route.params.sessionNumber || this.$store.state.main.session.sessionNumber;
            this.loadInitData({sessionNumber: sessionNumber})
                .then(() => {
                    this.loading = false;
                    this.$store.commit(RELOAD_AUTH);
                })
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
        position: fixed;
        top: 72px;
        z-index: 98;
    }

    .slot-wrap {
        width: 100%;
        margin-top: 71px;
        display: flex;
        flex-direction: column;
    }

    .slot-body-wrap {
        display: flex;
        justify-content: center;
        background-color: #f5f5f5;
    }

</style>
