<template>
    <div class="idea-detail-header-wrap">
        <div class="idea-detail-header-main">
            <button class="favorite-button">
                <img v-show="!isFavorite" @click="toggleFavorite" class="favorite-button-image-off" src="@/assets/img/favourites-filled-star-symbol@2x.png"/>
                <img v-show="isFavorite" @click="toggleFavorite" class="favorite-button-image-on" src="@/assets/img/favourites-filled-star-symbol-copy@2x.png"/>
            </button>
            <span class="idea-detail-header-title">아이디어 제목이 표시됩니다.</span>
            <button class="idea-detail-header-modify-button">
                <span class="idea-detail-header-modify-button-span">수정하기</span>
            </button>
        </div>
        <div class="idea-detail-header-sub">
            <span class="idea-detail-header-sub-text">개발자</span>
            <span class="idea-detail-header-sub-text">미카엘</span>
            <span class="idea-detail-header-sub-text">2019.08.14 03:54:33</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IdeaDetailHeader",
        data() {
            return {
                isFavorite: true,
            }
        },

        methods: {
            toggleFavorite() {
                this.isFavorite = !this.isFavorite;
            }
        }
    }
</script>

<style scoped>
    .idea-detail-header-wrap {
        margin: 75px 0px 21px 0px;
    }

    .idea-detail-header-main {
        height: 60px;
        display: flex;
    }

    .favorite-button {
        width: 28px;
        height: 26.6px;
        margin: auto 0px;
    }

    .favorite-button-image-off {
        width: 28px;
        height: 26.6px;
        object-fit: contain;
    }

    .favorite-button-image-on {
        width: 28px;
        height: 26.6px;
        object-fit: contain;
    }

    .idea-detail-header-title {
        width: 338px;
        height: 45px;
        margin: 9px 0px 10px 12px;
        font-size: 30px;
        letter-spacing: -1px;
        color: #000000;
    }

    .idea-detail-header-modify-button {
        width: 200px;
        height: 57px;
        margin-left: 621px;
        border-radius: 6px;
        border-style: none;
        background-color: #ff5000;
    }

    .idea-detail-header-modify-button-span {
        width: 63px;
        height: 27px;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }

    .idea-detail-header-sub {
        margin-top: 6px;
        text-align: left;
    }

    .idea-detail-header-sub-text {
        height: 21px;
        font-size: 18px;
        font-weight: 500;
        margin-right: 20px;
        letter-spacing: -0.5px;
        color: #4a4a4a;
    }
</style>