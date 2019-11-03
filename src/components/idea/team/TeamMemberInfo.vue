<template>
    <div class="team-member-info-wrap">
        <span class="team-member-info-text">{{memberInfoText}}</span>
        <button @click="removeMember" class="team-member-info-remove-button">
            <img class="team-member-info-remove-img" src="@/assets/img/ico-team-member-remove.png"/>
        </button>
        <span class="team-member-info-id">{{member.id}}</span>
    </div>
</template>

<script>
    import {getPositionName} from '@/consts/positionType';

    export default {
        name: "TeamMemberInfo",
        props: {
            member: {
                type: Object,
                required: true
            }
        },

        computed: {
            memberInfoText() {
                return `${this.member.nextersNumber}기  ${getPositionName(this.member.position)}  ${this.member.name}`;
            }
        },

        methods: {
            removeMember() {
                alert('remove');
            }
        }
    }
</script>

<style scoped>
    .team-member-info-wrap {
        display: inline-block;
        width: 218px;
        height: 77px;
        margin: 0px 16px 16px 0px;
        padding: 14px 16px;
        border-radius: 6px;
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
    }

    .team-member-info-text {
        display: inline-block;
        width: 150px;
        height: 24px;
        text-overflow: ellipsis;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -1px;
        color: #1c1c1c;
    }

    .team-member-info-remove-button {
        display: inline-block;
        vertical-align: baseline;
        margin-left: 16px;
        padding-bottom: 1px;
        width: 10px;
        height: 20px;
    }

    .team-member-info-remove-img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .team-member-info-id {
        width: 150px;
        height: 20px;
        text-overflow: ellipsis;
        margin-top: 6px;
        font-family: NotoSansCJKkr;
        font-size: 14px;
        letter-spacing: -0.88px;
        color: #1c1c1c;
    }
</style>
