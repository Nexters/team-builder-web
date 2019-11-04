<template>
    <div class="session">
        <div class="session-info-wrap">
            <div class="session-info-main">
                <div class="session-info-title">
                    {{teambuildingTitle}}
                </div>

                <div class="session-info-sub-title">
                    {{teambuildingMessage}}
                </div>

                <button v-if="isAdmin" class="session-info-button">
                    아이디어 추가하기
                </button>
            </div>

            <div class="session-info-image-wrap">
                <img class="session-info-image" src="@/assets/img/teambuilding_manage_session.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Session",

        computed: {
            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            teambuildingTitle() {
                return `넥스터즈 ${this.$store.state.main.session.sessionNumber}기의 팀빌딩을 ${this.isAdmin ? '관리': '시작'}해요.`;
            },

            teambuildingMessage() {
                if (this.isAdmin) {
                    return '선정 아이디어의 팀빌딩 현황을 체크하고 관리해요.';
                }
                return '아이디어 선정자는 자신의 아이디어 게시글을 수정해서 팀원을 추가해 주세요.';
            }
        }
    }
</script>

<style src="./Session.css" scoped>

</style>
