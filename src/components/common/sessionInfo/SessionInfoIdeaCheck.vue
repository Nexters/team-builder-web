<template>
    <div class="session-info-wrap">
        <div class="session-info-main">
            <div class="session-info-title">
                <span>넥스터즈 {{sessionNumber}}기의<br>{{ mainTitle }}</span>
            </div>

            <div class="session-info-message">
                <span class="session-info-message-text">아이디어 선정자는 게시글 수정을 통해 발표자료를 첨부해주세요.</span>
            </div>

        </div>

        <div class="session-info-image-wrap">
            <div class="session-info-image-box">
                <img class="session-info-image" src="@/assets/img/session_ingo_idea_check_image.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SessionInfoIdeaCheck",
        data() {
            return {
                sessionNumber: this.$store.state.main.session.sessionNumber,
            }
        },

        computed: {
            mainTitle() {
                return '아이디어가 선정되었어요';
            }
        },

        methods: {
            moveNewIdea() {
                this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/new`});
            }
        }
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
        width: 578px;
        height: 100%;
    }

    .session-info-title {
        text-align: left;
        margin: 67px 0px 16px 0px;
        width: 100%;
        height: 118px;
        font-family: NotoSansCJKkr;
        line-height: normal;
        font-size: 40px;
        font-weight: 300;
        letter-spacing: -3px;
        color: #000000;
    }

    .session-info-message {
        text-align: left;
    }

    .session-info-message-text {
        width: 403px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #1c1c1c;
    }

    .session-info-image-wrap {
        width: 560px;
        height: 100%;
        margin-left: 61px;
    }

    .session-info-image-box {
        width: 400px;
        height: 321px;
        margin: 32px 50px 46px 110px;
    }

    .session-info-image {
        width: 400px;
        height: 321px;
        object-fit: contain;
    }

</style>
