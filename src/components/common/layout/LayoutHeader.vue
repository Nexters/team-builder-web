<template>
    <div class="layout-header">
        <div class="header-contents-wrap">
            <div class="contents-mode">
                <div class="mode-idea on">아이디어</div>
                <div class="mode-idea-bar"></div>
            </div>
            <div class="contents-mode">
                <div class="mode-team-building">팀빌딩</div>
                <img class="mode-team-building-padlock" src="../../../assets/img/header-padlock-icon.png"/>
                <div class="mode-team-building-bar"></div>
            </div>

            <div class="header-period header-period-on" style="margin-left: 449px;">
                <div class="period-step period-step-on">step1</div>
                아이디어 모집
            </div>
            <img class="period-right-icon" src="../../../assets/img/header-right-icon.png"/>
            <div class="header-period">
                <div class="period-step">step2</div>
                아이디어 투표
            </div>
            <img class="period-right-icon" src="../../../assets/img/header-right-icon.png"/>
            <div class="header-period">
                <div class="period-step">step3</div>
                선정아이디어 확인
            </div>
            <img class="period-right-icon" src="../../../assets/img/header-right-icon.png"/>
            <div class="header-period">
                <div class="period-step">step4</div>
                팀빌딩
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutHeader"
    }
</script>

<style scoped>
    .layout-header {
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: center;
    }

    .header-contents-wrap {
        min-width: 1200px;
        height: 70px;
        display: flex;
    }

    .contents-mode {
        width: 110px;
        height: 72px;
        margin-right: 20px;
        color: #9b9b9b;
    }

    .mode-idea {
        width: 63px;
        height: 27px;
        margin: 26px 47px 17px 0px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -1px;
    }

    .mode-team-building {
        width: 47px;
        height: 27px;
        margin: 26px 6px 17px 0px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -1px;
        display: inline-block;
    }

    .on {
        font-weight: bold;
        color: #273ea5;
    }

    .mode-team-building-padlock {
        width: 12px;
        height: 15px;
        margin-bottom: 5px;
        margin-right: 45px;
        object-fit: contain;
    }

    .mode-idea-bar {
        width: 63px;
        height: 2px;
        background-color: #273ea5;
    }

    .mode-team-building-bar {
        width: 47px;
        height: 2px;
        background-color: #273ea5;
    }

    .header-period {
        margin: 30px 0px 18px 0px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -0.6px;
        color: #898989;
        position: relative;
    }

    .header-period-on {
        color: #000000;
    }

    .period-right-icon {
        width: 15px;
        height: 14px;
        object-fit: contain;
        margin: 36px 16px 22px 16px;
    }

    .period-step {
        width: 29px;
        height: 14px;
        position: absolute;
        top: -15px;
        left: -2px;
        font-family: Roboto;
        font-size: 12px;
        font-weight: 300;
        font-style: italic;
        color: #9b9b9b;
    }

    .period-step-on {
        color: #208b84;
    }
</style>