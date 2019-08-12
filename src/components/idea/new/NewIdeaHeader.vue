<template>
    <div class="new-idea-header">
        <div class="new-idea-title-wrap">
            <input class="new-idea-title-contents"
                   v-model="newIdeaTitle"
                   placeholder="아이디어를 한문장으로 요약해주세요."
                   ref="newIdeaTitle"
            />
            <div class="new-idea-title-border-line"></div>
        </div>
        <button class="new-idea-finish-button-wrap">
            <span class="new-idea-finish-button">작성완료</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "NewIdeaHeader",
        data() {
            return {
                newIdeaTitle: '',
            }
        },

        created() {

        },

        mounted() {
            this.$refs.newIdeaTitle.focus();
        }
    }
</script>

<style scoped>
    .new-idea-header {
        display: flex;
    }

    .new-idea-title-wrap {
        width: 900px;
        height: 64px;
        text-align: left;
        border-radius: 6px;
    }

    .new-idea-title-contents {
        width: 444px;
        height: 45px;
        margin: 9px auto 10px 0px;
        font-size: 30px;
        font-weight: 300;
        letter-spacing: -1px;
        color: #9b9b9b;
    }

    .new-idea-title-border-line {
        width: 100%;
        height: 1px;
        background-color: #dbdbdb;
    }

    .new-idea-finish-button-wrap {
        width: 200px;
        height: 57px;
        margin: 3.5px 0px 3.5px 99px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .new-idea-finish-button {
        width: 63px;
        height: 27px;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }
</style>