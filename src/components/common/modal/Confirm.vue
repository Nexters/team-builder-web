<template>
    <div v-if="showConfirm" class="confirm-wrap">
        <div class="confirm-contents">
            <div class="confirmMessageTextWrap">
                <Nl2br tag="span" :text="confirmMessage" class-name="confirmMessageText" />
            </div>

            <div class="confirm-button-group">
                <button @click="confirmNo" class="confirmNoButton">
                    <span class="confirmNoButtonText">{{confirmNoButtonText}}</span>
                </button>
                <button @click="confirmYes" class="confirmYesButton">
                    <span class="confirmYesButtonText">{{confirmYesButtonText}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import Nl2br from 'vue-nl2br';
    import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
    import {createNamespacedHelpers} from 'vuex';
    const { mapState } = createNamespacedHelpers('common');

    export default {
        name: "Confirm",
        components: {Nl2br},

        computed: {
            ...mapState({
                showConfirm : state => state.showConfirm,
                confirmMessage: state => state.confirmMessage,
                confirmYesButtonText: state => state.confirmYesButtonText,
                confirmNoButtonText: state => state.confirmNoButtonText
            })
        },

        watch: {
            showConfirm: function (isShowConfirm) {
                if (isShowConfirm) {
                    disableBodyScroll(document);
                } else {
                    enableBodyScroll(document);
                }
            }
        },

        methods: {
            confirmNo() {
                this.$store.state.common.confirmNoFunction && this.$store.state.common.confirmNoFunction();
                this.$store.commit('common/closeConfirm');
            },

            confirmYes() {
                this.$store.state.common.confirmYesFunction && this.$store.state.common.confirmYesFunction();
                this.$store.commit('common/closeConfirm');
            }
        }
    }
</script>

<style scoped>
    .confirm-wrap {
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

    .confirm-contents {
        width: 600px;
        height: 300px;
        border-radius: 6px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
        background-color: #ffffff;
    }

    .confirmMessageTextWrap {
        margin: 0px 91px;
        width: 418px;
        height: 202px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .confirmMessageText {
        font-family: NotoSansCJKkr;
        font-size: 22px;
        font-weight: 300;
        line-height: 1.5;
        letter-spacing: -0.66px;
        color: #000000;
    }

    .confirmNoButton {
        width: 200px;
        height: 64px;
        margin-right: 30px;
        border-radius: 6px;
        background-color: #eeeeee;
    }

    .confirmYesButton {
        width: 200px;
        height: 64px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .confirmNoButtonText {
        width: 79px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        line-height: 1.5;
        letter-spacing: -0.66px;
        text-align: center;
        color: #000000;
    }

    .confirmYesButtonText {
        width: 40px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        line-height: 1.5;
        letter-spacing: -0.66px;
        text-align: center;
        color: #ffffff;
    }

    .confirm-button-group {
        margin: 0px 85px;
    }
</style>
