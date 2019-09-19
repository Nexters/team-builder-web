<template>
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
        <SessionInfoIdeaCollect v-if="isIdeaCollect"></SessionInfoIdeaCollect>
        <SessionInfoIdeaVote v-else-if="isIdeaVote"></SessionInfoIdeaVote>
        <SessionInfoIdeaCheck v-else-if="isIdeaCheck"></SessionInfoIdeaCheck>
        <SessionInfoTeamBuilding v-else-if="isTeamBuilding"></SessionInfoTeamBuilding>

        <div class="border-line"></div>
    </div>
</template>

<script>
    import {PERIOD_TYPE} from '@/consts/periodType';
    import SessionInfoIdeaCollect from '@/components/common/sessionInfo/SessionInfoIdeaCollect';
    import SessionInfoIdeaVote from '@/components/common/sessionInfo/SessionInfoIdeaVote';
    import SessionInfoIdeaCheck from '@/components/common/sessionInfo/SessionInfoIdeaCheck';
    import SessionInfoTeamBuilding from '@/components/common/sessionInfo/SessionInfoTeamBuilding';

    import {ACTIONS, GETTERS, MUTATIONS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';
    const {mapMutations, mapGetters, mapState, mapActions} = createNamespacedHelpers('main');


    export default {
        name: "SessionInfoWrap",
        components: {SessionInfoTeamBuilding, SessionInfoIdeaCheck, SessionInfoIdeaCollect, SessionInfoIdeaVote},
        data() {
            return {
                sessionNumber: this.$store.state.main.session.sessionNumber,
                // nowPeriodType: this.$store.state.main.nowPeriod.periodType,

                isIdeaCollect: false,
                isIdeaVote: false,
                isIdeaCheck: false,
                isTeamBuilding: false,
            }
        },

        created() {
            switch (this.nowPeriodType) {
                case PERIOD_TYPE.IDEA_COLLECT:
                    this.isIdeaCollect = true;
                    return;
                case PERIOD_TYPE.IDEA_VOTE:
                    this.isIdeaVote = true;
                    return;
                case PERIOD_TYPE.IDEA_CHECK:
                    this.isIdeaCheck = true;
                    return;
                case PERIOD_TYPE.TEAM_BUILDING:
                    this.isTeamBuilding = true;
                    return;
            }
        },

      computed: {
        ...mapGetters({
          nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW

        })
      }

    }
</script>

<style scoped>
    .border-line {
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
    }

</style>
