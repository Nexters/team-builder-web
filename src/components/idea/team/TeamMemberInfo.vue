<template>
    <div class="team-member-info-wrap" :class="{selected: isSelectedMember}" @click="addMember">
        <span class="team-member-info-text" :class="{'no-remove': !isAvailableRemove}">{{memberInfoText}}</span>
        <button v-show="isAvailableRemove" @click.stop="removeMember" class="team-member-info-remove-button">
            <img class="team-member-info-remove-img" src="@/assets/img/ico-team-member-remove.png"/>
        </button>
        <span v-if="member.id.length <= idMaxSize" class="team-member-info-id" :class="{'no-remove': !isAvailableRemove}">{{member.id}}</span>
        <span v-else class="team-member-info-id" :class="{'no-remove': !isAvailableRemove}">{{member.id.substr(0, idMaxSize)}}...</span>
    </div>
</template>

<script>
    import {getPositionName} from '@/consts/positionType';
    import {ID_MAX_SIZE, NAME_MAX_SIZE} from "@/consts/OverLengthDefine";

    export default {
        name: "TeamMemberInfo",
        props: {
            member: {
                type: Object,
                required: true
            },

            infoType: {
                type: String,
            },

            newMembers: {
                type: Array
            },

            index: {
                type: Number
            },
        },

        data() {
            return {
                idMaxSize: ID_MAX_SIZE,
                nameMaxSize: NAME_MAX_SIZE
            }
        },

        computed: {
            memberInfoText() {
                return this.member.name.length <= this.nameMaxSize ?
                    `${this.member.nextersNumber}기  ${getPositionName(this.member.position)}  ${this.member.name}` :
                    `${this.member.nextersNumber}기  ${getPositionName(this.member.position)}  ${this.member.name.substr(0, this.nameMaxSize)}...`;
            },

            isAvailableRemove() {
                return this.infoType === 'NEW_MEMBER' && this.member.uuid !== this.$store.state.auth.uuid;
            },

            /**
             * 이미 팀에 포함된 회원인지 여부
             */
            isSelectedMember() {
                if (this.infoType !== 'SEARCH') {
                    return false;
                }
                return !!this.newMembers.find(newMember => newMember.id === this.member.id);
            }
        },

        methods: {
            addMember() {
                if (this.infoType !== 'SEARCH') {
                    return;
                }

                if (!this.newMembers) {
                    return;
                }

                if (this.isSelectedMember) {
                    this.$store.commit('common/showAlert', {alertMessage: '선택한 회원에 포함된 회원입니다.'});
                    return;
                }

                this.newMembers && this.newMembers.push(this.member);
            },

            removeMember() {
                if (this.infoType !== 'NEW_MEMBER') {
                    return;
                }

                this.newMembers && this.newMembers.splice(this.index, 1);
            }
        }
    }
</script>

<style scoped>
    .team-member-info-wrap {
        display: inline-block;
        width: 218px;
        height: 77px;
        margin: 0px 12px 12px 0px;
        padding: 10px 16px;
        border-radius: 6px;
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
    }

    .selected {
        border: solid 1px #9b9b9b!important;
    }

    .team-member-info-text {
        display: inline-block;
        width: 150px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -1px;
        color: #1c1c1c;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .no-remove {
        width: 184px!important;
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
        display: inline-block;
        width: 150px;
        height: 20px;
        font-family: NotoSansCJKkr;
        font-size: 14px;
        letter-spacing: -0.88px;
        color: #1c1c1c;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
