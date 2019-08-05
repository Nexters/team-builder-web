<template>
    <div class="layout-container">
        <div class="layout-gnb">
            <div class="gnb-logo-wrap"><div class="gnb-logo-image"><img style="width: 48px; height: 48px;" src="../assets/img/nexters_15th_logo.png"/></div></div>
            <div class="gnb-session-wrap">
                <div class="gnb-session">
                    16
                </div>
                <img class="gnb-session-open-icon" src="../assets/img/gnb_open_icon.png" />
            </div>
            <div class="gnb-my-page">
                <div class="gnb-my-page-name">
                    허
                </div>
            </div>
        </div>
        <div class="layout-header">
        </div>
        <div class="layout-body">
            <div class="main-info"></div>
            <div class="main-idea-list-wrap"></div>
        </div>
        <div class="layout-footer">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .layout-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 0px;
        padding: 0px;

    }

    .layout-gnb {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 70px;
        height: 100%;
        background-color: #273ea5;
        display: flex;
        flex-direction: column;
    }

    .gnb-logo-wrap {
        height: 72px;
        background-color: white;
    }

    .gnb-logo-image {
        margin: 11px 10px;
        width: 48px;
        height: 51px;
        border-radius: 10px;
    }

    .gnb-session-wrap {
        height: 70px;
        background-color: #192f93;
        position: relative;
    }

    .gnb-session {
        margin: 23px 31px 23px 18px;
        width: 21px;
        font-family: Roboto;
        font-size: 20px;
        font-weight: 300;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .gnb-session-open-icon {
        position: absolute;
        right: 20px;
        top: 30px;
        height: 12px;
        object-fit: contain;
    }

    .gnb-my-page {
        position: absolute;
        width: 44px;
        height: 44px;
        bottom: 22px;
        left: 13px;
        border-radius: 6px;
        background-color: #4c64cf;
    }

    .gnb-my-page-name  {
        width: 18px;
        height: 29px;
        margin: 8px 13px 7px 13px;
        font-family: NotoSansCJKkr;
        font-size: 20px;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .layout-header {
        width: 100%;
        height: 72px;
        background-color: green;
    }

    .layout-body {
        width: 1200px;
        height: 1200px;
        display: flex;
        flex-direction: column;
    }

    .main-info {
        height: 400px;
        background-color: white;
    }

    .main-idea-list-wrap {
        height: 100%;
        background-color: #f5f5f5;
    }

    .layout-footer {
        width: 100%;
        height: 70px;
        background-color: black;
    }
</style>