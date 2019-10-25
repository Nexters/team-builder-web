<template>
    <div class="session">
        <div class="session-info-wrap">
            <div class="session-info-main">
                <div class="session-info-title">
                    넥스터즈 {{this.$store.state.main.session.sessionNumber}}기의
                    팀빌딩을 관리해요.
                </div>

                <div class="session-info-sub-title">
                    선정 아이디어의 팀빌딩 현황을 체크하고 관리해요.
                </div>

                <button class="session-info-button">
                    아이디어 작성하기
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
        name: "Session"
    }
</script>

<style src="./Session.css" scoped>

</style>
