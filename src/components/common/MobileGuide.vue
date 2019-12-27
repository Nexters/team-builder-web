<template>
    <div class="mobile-guide-wrap">
        <div class="mobile-guide-contents">
            <div class="wait-message-wrap">
                <span class="wait-message-text">잠시만요 !</span>
            </div>
            <div class="wait-message-detail-wrap">
                <span class="wait-message-detail-text">
                    넥스터즈 아이디어 라이브러리 모임모임은
                    <br>PC 웹에 최적화되어 있어요. 모바일은
                    <br>데스크톱 버전으로 변경해주세요.
                </span>
            </div>

            <div class="mobile-guide-image-wrap">
                <img class="mobile-guide-image" src="@/assets/img/mobile/mobile_guide_img.png"/>
            </div>
            <div class="moimmoim-logo-wrap">
                <img class="moimmoim-logo-image" src="@/assets/img/mobile/mobile_guide_moimmoim_ico.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileGuide",
        metaInfo: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ]
    }
</script>

<style scoped>
    .mobile-guide-wrap {
        height: -webkit-fill-available;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mobile-guide-contents {
        width: 264px;
    }
    .wait-message-wrap {
        text-align: center;
    }
    .wait-message-text {
        width: 123px;
        height: 47px;
        font-family: NotoSansCJKkr;
        font-size: 32px;
        font-weight: 300;
        letter-spacing: -2px;
        color: #273ea5;
    }
    .wait-message-detail-wrap {
        margin-top: 10px;
        text-align: center;
    }
    .wait-message-detail-text {
        width: 264px;
        height: 50px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: -0.6px;
        color: #000000;
    }
    .mobile-guide-image-wrap {
        margin-top: 30px;
    }
    .mobile-guide-image {
        width: 258px;
        height: 207px;
        object-fit: contain;
    }
    .moimmoim-logo-wrap {
        margin-top: 20px;
    }
    .moimmoim-logo-image {
        width: 101px;
        height: 14px;
        object-fit: contain;
    }
</style>

<meta name="viewport" content="width=device-width, initial-scale=1">
