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

            if (nowDate.isAfter(endDate)) {
                this.ddayMessage = '마감되었습니다.';
                return;
            }

            const remainHourNumber = moment(endDate, 'YYYY-MM-HH').diff(nowDate, 'hour');
            /**
             * 24시간 이상 남은 경우
             */
            if (remainHourNumber >= 24) {
                this.ddayMessage = `마감시간 \'${moment(this.nowPeriod.endDate).format('M월 D일')} 저녁 12시\' 까지 ${Math.floor(remainHourNumber / 24)}일 ${remainHourNumber%24}시간 남았습니다.`;
                return;
            }

            /**
             * 1시간 미만으로 남은 경우
             */
            if (remainHourNumber < 1) {
                this.ddayMessage = `마감시간 \'${moment(this.nowPeriod.endDate).format('M월 D일')} 저녁 12시\' 곧 아이디어 모집이 마감됩니다.`;
                return;
            }

            /**
             * 1 ~ 23 시간 남은 경우
             */
            this.ddayMessage = `마감시간 \'${moment(this.nowPeriod.endDate).format('M월 D일')} 저녁 12시\' 까지 ${remainHourNumber}시간 남았습니다.`;
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
