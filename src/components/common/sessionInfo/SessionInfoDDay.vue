<template>
    <div class="session-info-d-day">
        <img class="exclamation-mark-icon" src="@/assets/img/exclamation-mark-icon.png"/>
        <div class="apply-state-massage">
            <span>{{ stateMessage }}</span>
        </div>
        <div class="d-day-info-message">
            <span>{{ ddayMessage }}</span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import {PERIOD_TYPE} from '@/consts/periodType';

    export default {
        name: "SessionInfoDDay",
        data() {
            return {
                ddayMessage: '',
                nowPeriod: this.$store.state.main.nowPeriod,
            }
        },

        computed: {
            stateMessage() {
                /**
                 * 아이디어 모집기간
                 */
                if (this.nowPeriod.periodType === PERIOD_TYPE.IDEA_COLLECT) {
                    if (this.$store.state.auth.submitIdea) {
                        return '작성완료';
                    }
                    return '미작성';
                }

                /**
                 * 아이디어 투표기간
                 */
                if (this.$store.state.auth.voted) {
                    return '투표완료';
                }
                return '미투표';
            }
        },

        created() {
            const endDate = moment(this.nowPeriod.endDate);
            const nowDate = moment();
            const remainDayNumber = moment(endDate, 'YYYY-MM').diff(nowDate, 'day');
            const remainHourNumber = moment(endDate, 'YYYY-MM-HH').diff(nowDate, 'hour') % 24;

            if (nowDate.isAfter(endDate)) {
                this.ddayMessage = '마감되었습니다.';
                return;
            }

            const remainDay = remainDayNumber === 0 ? '' : (remainDayNumber + '일');
            let remainHour = remainHourNumber === 0 ? '' : (remainHourNumber + '시간');
            if (!remainHour) {
                remainHour = moment(endDate, 'YYYY-MM-HH-MM').diff(nowDate, 'minute') + '분';
            }

            this.ddayMessage = `마감일(${moment(this.nowPeriod.endDate).format('M월D일')}) 까지 ${remainDay} ${remainHour} 남았습니다.`;
        },
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
        margin: 3px 0px; /*서버상에서는 이 수치가 맞으니 수정하지 말 것*/
    }

    .apply-state-massage {
        width: 60px;
        font-family: NotoSansCJKkr;
        padding: 2px 0px 0px 0px;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: -0.6px;
        margin: 0px 22px 0px 8px;
        color: #ff532c;
    }

    .d-day-info-message {
        text-align: left;
        padding: 2px 0px 0px 0px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -0.6px;
        color: #1c1c1c;
    }
</style>
