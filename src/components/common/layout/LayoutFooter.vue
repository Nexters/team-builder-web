<template>
    <div class="layout-footer">
        <div class="footer-contents-wrap">
            <img class="footer-moimmoim-icon" src="@/assets/img/moimmoim_icon.png"/>
            <span class="footer-message">© 2019 Moim-construct Corp. All rights reserved.</span>
            <div class="footer-sns-group">
                <div class="sns-nexters-icon-wrap" @mouseover="nextersIconHover = true" @mouseleave="nextersIconHover = false">
                    <a target="_blank" href="http://teamnexters.com/"><img class="sns-nexters-icon" :src="nextersIconUrl"/></a>
                </div>
                <div class="sns-facebook-icon-wrap" @mouseover="facebookIconHover = true" @mouseleave="facebookIconHover = false">
                    <a target="_blank" href="https://www.facebook.com/Nexterspage/"><img class="sns-facebook-icon" :src="facebookIconUrl"/></a>
                </div>
                <div class="sns-instagram-icon-wrap" @mouseover="instagramIconHover = true" @mouseleave="instagramIconHover = false">
                    <a target="_blank" href="https://www.instagram.com/team_nexters/"><img class="sns-instagram-icon" :src="instagramIconUrl"/></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getImgUrl} from '@/utils/image';

    export default {
        name: "LayoutFooter",
        data() {
            return {
                nextersIconHover: false,
                facebookIconHover: false,
                instagramIconHover: false,
            }
        },
        computed: {
            nextersIconUrl() {
                return this.nextersIconHover ? getImgUrl('nexters-hover-icon') : getImgUrl('nexters-icon');
            },

            facebookIconUrl() {
                return this.facebookIconHover ? getImgUrl('facebook-hover-icon') : getImgUrl('facebook-icon');
            },

            instagramIconUrl() {
                return this.instagramIconHover ? getImgUrl('instagram-hover-icon') : getImgUrl('instagram-icon');
            }
        },
    }
</script>

<style scoped>
    .layout-footer {
        margin-left: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        min-width: 1200px;
    }

    .footer-contents-wrap {
        width: 100%;
        margin: 17px 0px;
        display: flex;
    }

    .footer-moimmoim-icon {
        width: 130px;
        height: 18px;
        margin: 9px 0px;
        object-fit: contain;
    }

    .footer-message {
        width: 324px;
        height: 16px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0.5px;
        color: #4a4a4a;
        margin: 10px 579px 10px 36px;
    }

    .footer-sns-group {
        width: 128px;
        display: flex;
    }

    .sns-nexters-icon-wrap {
        width: 36px;
        height: 36px;
        object-fit: contain;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sns-nexters-icon {
        width: 24px;
        height: 19px;
    }

    .sns-facebook-icon-wrap {
        width: 36px;
        height: 36px;
        margin: 0px 10px;
        object-fit: contain;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sns-facebook-icon {
        width: 12px;
        height: 24px;
    }

    .sns-instagram-icon-wrap {
        width: 36px;
        height: 36px;
        object-fit: contain;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sns-instagram-icon {
        width: 23px;
        height: 23px;
    }

</style>