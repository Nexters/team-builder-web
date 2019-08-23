<template>
    <div class="session-info-d-day">
        <img class="exclamation-mark-icon" src="@/assets/img/exclamation-mark-icon.png"/>
        <div class="apply-state-massage">
            <span>미제출</span>
        </div>
        <div class="d-day-info-message">
            <span>마감까지 {{ remainDay }}일 {{ remainHour }}시간 남았습니다.</span>
        </div>
    </div>
</template>

<script>
    import {PERIOD_TYPE} from '@/consts/periodType';
    import moment from 'moment';

    export default {
        name: "SessionInfoDDay",
        data() {
            return {
                remainDay: 0,
                remainHour: 0,
            }
        },
        created() {
            const period = this.$store.state.main.session.periods
                                .find(period => period.periodType === PERIOD_TYPE.IDEA_COLLECT);
            const endDate = moment(period.endDate);
            const nowDate = moment();

            this.remainDay = moment(endDate, 'YYYY-MM').diff(nowDate, 'day');
            this.remainHour = moment(endDate, 'YYYY-MM-HH').diff(nowDate, 'hour') % 24;
        }
    }
</script>

<style scoped>
    .session-info-d-day {
        height: 24px;
        display: flex;
    }

    .exclamation-mark-icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
        margin: auto 0px;
    }

    .apply-state-massage {
        width: 43px;
        font-family: NotoSansCJKkr;
        padding: 2px 0px 0px 0px;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: -0.6px;
        margin: 0px 22px 0px 8px;
        color: #ff532c;
    }

    .d-day-info-message {
        width: 199px;
        padding: 2px 0px 0px 0px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -0.6px;
        color: #1c1c1c;
    }
</style>