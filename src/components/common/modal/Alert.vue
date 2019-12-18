<template>
    <div v-if="showAlert" class="alert-wrap">
        <div class="alert-contents">
            <div class="alertMessageTextWrap">
                <Nl2br tag="span" :text="alertMessage" class-name="alertMessageText" />
            </div>

            <button @click="closeAlert" class="alertCloseButton">
                <span class="alertCloseButtonText">닫기</span>
            </button>
        </div>
    </div>
</template>

<script>
    import Nl2br from 'vue-nl2br';
    import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
    import {createNamespacedHelpers} from 'vuex';
    const { mapState } = createNamespacedHelpers('common');

    export default {
        name: "Alert",
        components: {Nl2br},

        computed: {
            ...mapState({
                showAlert : state => state.showAlert,
                alertMessage: state => state.alertMessage
            })
        },

        watch: {
            showAlert: function (isShowAlert) {
                if (isShowAlert) {
                    disableBodyScroll(document);
                } else {
                    enableBodyScroll(document);
                }
            }
        },

        methods: {
            closeAlert() {
                this.$store.commit('common/closeAlert');
            }
        }
    }
</script>

<style scoped>
    .alert-wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 101;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .alert-contents {
        width: 600px;
        height: 300px;
        border-radius: 6px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
        background-color: #ffffff;
    }

    .alertMessageTextWrap {
        margin: 0px 122px;
        width: 356px;
        height: 202px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .alertMessageText {
        font-family: NotoSansCJKkr;
        font-size: 22px;
        font-weight: 300;
        line-height: 1.5;
        letter-spacing: -0.66px;
        color: #000000;
    }

    .alertCloseButton {
        width: 240px;
        height: 64px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .alertCloseButtonText {
        width: 40px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        line-height: 1.5;
        letter-spacing: -0.66px;
        text-align: center;
        color: #ffffff;
    }
</style>
