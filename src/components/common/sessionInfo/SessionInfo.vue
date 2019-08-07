<template>
    <div style="display: flex; justify-content: center">
        <div class="session-info-wrap">
            <div class="session-info-main">
                <div class="session-info-title">
                    <span>넥스터즈 16기의<br>다양한 아이디어를 모집해요</span>
                </div>
                <SessionInfoDDay></SessionInfoDDay>

                <div class="session-info-idea-write-wrap">
                    <button class="session-info-idea-write-button">
                        <span class="session-info-idea-write-message">아이디어 작성하기</span>
                    </button>
                </div>
            </div>

            <div class="session-info-image-wrap"></div>
        </div>
    </div>
</template>

<script>
    import SessionInfoDDay from '@/components/common/main/sessionInfo/SessionInfoDDay';
    export default {
        name: "SessionInfo",
        components: {SessionInfoDDay}
    }
</script>

<style scoped>
    .session-info-wrap {
        min-width: 1200px;
        margin-left: 70px;
        height: 400px;
        background-color: white;
        display: flex;
    }

    .session-info-main {
        width: 418px;
        height: 100%;
    }

    .session-info-title {
        text-align: left;
        margin: 67px 0px 16px 0px;
        width: 100%;
        height: 118px;
        font-family: NotoSansCJKkr;
        font-size: 40px;
        font-weight: 300;
        letter-spacing: -3px;
        color: #000000;
    }

    .session-info-idea-write-wrap {
        text-align: left;
        margin-top: 39px;
    }

    .session-info-idea-write-button {
        width: 240px;
        height: 64px;
        border-style: none;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .session-info-idea-write-message {
        width: 158px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        letter-spacing: -1px;
        color: #ffffff;
    }


</style>