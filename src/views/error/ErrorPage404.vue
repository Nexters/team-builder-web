<template>
    <div class="error-page-wrap">
        <div class="error-page-white-box">
            <div class="error-page-contents-box">
                <div class="error-code-number-wrap">
                    <span class="error-code-number-text">{{ errorCode }}</span>
                </div>
                <div class="error-message-wrap">
                    <span class="error-message-text">{{ errorMessage }}</span>
                </div>
                <div class="history-back-button-wrap">
                    <button @click="historyBack()" class="history-back-button">
                        <span class="history-back-button-text">이전 페이지로 가기</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ErrorPage404",
        data() {
            return {
                errorCode: '404',
                errorMessage: '이런 !  페이지를 찾을 수 없습니다'
            }
        },

        methods: {
            historyBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .error-page-wrap {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eeeeee;
    }

    .error-page-white-box {
        width: 984px;
        height: 726px;
        border-radius: 6px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.09);
        background-color: #ffffff;
    }

    .error-page-contents-box {
        width: 423px;
        height: 100%;
        margin: 0px auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .error-code-number-wrap {
        width: 324px;
        height: 205px;
        margin-top: 154px;
    }

    .error-code-number-text {
        font-family: Roboto;
        font-size: 160px;
        font-weight: 300;
        line-height: normal;
        letter-spacing: 20px;
        color: #273ea5;
    }

    .error-message-wrap {
        margin-top: 21px;
    }

    .error-message-text {
        width: 100%;
        height: 47px;
        font-family: NotoSansCJKkr;
        font-size: 32px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        color: #000000;
    }

    .history-back-button-wrap {
        margin-top: 80px;
    }

    .history-back-button {
        width: 240px;
        height: 65px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .history-back-button-text {
        width: 162px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
        text-align: center;
        color: #ffffff;
    }
</style>