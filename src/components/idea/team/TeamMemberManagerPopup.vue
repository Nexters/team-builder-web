<template>
    <div class="popup-wrap-background">
        <div class="team-member-manage-popup-wrap">
            <span class="team-member-manage-title">팀원 추가하기</span>
            <button @click.prevent="closePopup" class="close-popup-wrap">
                <img class="close-popup-icon-image" src="@/assets/img/ico_popup_close.png"/>
            </button>
            <div style="height: 50px; margin-top: 24px;">
                <div style="display: inline-block; height: 100%; padding: 12px 0px;">
                    <span class="team-member-manage-search-text">회원 검색하기</span>
                </div>
                <div class="search">
                    <input @keyup="filtering()" v-on:input="searchKeyword = $event.target.value" type="search" placeholder="이름 또는 아이디를 검색해주세요" class="search-input">
                </div>
            </div>

            <div class="search-result-wrap" :class="{'no-search-wrap': searchMembers.length === 0}">
                <TeamMemberInfo v-for="member in searchMembers"
                                :infoType="'SEARCH'"
                                :newMembers="newMembers"
                                :key="member.id"
                                :member="member" />

                <span v-show="searchMembers.length === 0" class="no-search-result">검색결과가 없어요</span>
            </div>

            <div class="new-member-wrap">
                <span class="team-member-manage-search-text">현재 선택한 회원</span>
                <div class="new-member-list-wrap" :class="{'no-search-wrap': newMembers.length === 0}">
                    <TeamMemberInfo v-for="(member, index) in newMembers"
                                    :infoType="'NEW_MEMBER'"
                                    :newMembers="newMembers"
                                    :key="member.id"
                                    :member="member"
                                    :index="index" />
                    <span v-show="newMembers.length === 0" class="no-new-member">현재 선택한 회원이 없어요.</span>
                </div>
            </div>

            <div class="team-member-complete-button-wrap">
                <button @click="completeTeamMember" class="team-member-complete-button">
                    <span class="team-member-complete-text">팀원 적용하기</span>
                </button>
            </div>

            <button @click.prevent="clearNewMember()" class="new-member-clear-wrap">
                <span class="new-member-clear-text">선택 초기화</span>
            </button>
        </div>
    </div>
</template>

<script>
    import TeamMemberInfo from '@/components/idea/team/TeamMemberInfo';
    import {findActivatedUsers} from '@/api/UserAPI';
    export default {
        name: "TeamMemberManagerPopup",
        components: {TeamMemberInfo},

        props: {
            originMembers: {
                type: Array,
                required: true
            },
        },

        data() {
            return {
                activatedMembers: [], //활동 멤버 전체
                searchMembers : [], //검색된 멤버
                searchKeyword: '',

                newMembers: [] //완료버튼 클릭시 새롭게 팀원으로 적용될 멤버
            };
        },

        computed: {

        },

        methods: {
            closePopup() {
                //TODO: 바뀐내용있으면 한번 더 확인 confirm
                this.$emit('close');
            },

            filtering() {
                // 한글
                if (this.searchKeyword.match('^[ㄱ-ㅎ가-힣]*$')) {
                    const ChosungSearch = require('hangul-chosung-search-js');
                    const filterArray = this.activatedMembers.map(member => member.name)
                        .concat(this.activatedMembers.map(member => member.id));

                    const filteredList = this.searchKeyword ? ChosungSearch.searchList(this.searchKeyword, filterArray, true) : [];
                    this.searchMembers = this.activatedMembers.filter(member => {
                        return filteredList.includes(member.id) || filteredList.includes(member.name)
                    });

                    return;
                }

                // 영어
                const searchQuery = this.searchKeyword.toLowerCase();
                this.searchMembers = this.activatedMembers.filter(member => {
                    if (member.id.toLowerCase().includes(searchQuery)) return true;
                    if (member.name.toLowerCase().includes(searchQuery)) return true;
                })
            },

            completeTeamMember(event) {
                this.$emit('complete', event, {newMembers: this.newMembers});
            },

            /**
             * 선택 초기화 (본인 제외)
             */
            clearNewMember() {
                this.newMembers = this.newMembers.filter(member => member.uuid === this.$store.state.auth.uuid);
            }
        },

        created() {
            /**
             * 활동멤버 조회
             */
            findActivatedUsers()
                .then(res => {
                    this.activatedMembers.push(...res.data);
                });

            /**
             * 새롭게 적용될 멤버 (기존 멤버 추가)
             */
            this.newMembers.push(...this.originMembers);
        }
    }
</script>

<style scoped>
    .popup-wrap-background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .team-member-manage-popup-wrap {
        width: 988px;
        height: 733px;
        z-index: 101;
        padding: 34px 18px 34px 40px;
        text-align: left;
        border-radius: 6px;
        -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.09);
        box-shadow: 0 0 10px 0 rgba(0,0,0,.09);
        background-color: #fff;
    }

    .team-member-manage-title {
        display: inline-block;
        width: 122px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        letter-spacing: -0.73px;
        color: #000000;
    }

    .close-popup-wrap {
        display: inline;
        position: relative;
        left: 762px;
        top: -12px;
    }

    .close-popup-icon-image {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .team-member-manage-search-text {
        width: 100px;
        height: 27px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -0.54px;
        color: #000000;
    }

    .search {
        display: inline-block;
        float: right;
        width: 333px;
        height: 50px;
        margin-right: 26px;
        border-radius: 6px;
        border: solid 1px #eeeeee;
        background-color: #ffffff;

        background-color: #ffffff;
        background-image: url('../../../assets/img/ico-search@2x.png');
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 16px 15px;
    }

    .search-input {
        width: 260px;
        height: 24px;
        margin: 13px 10px 13px 50px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: -0.53px;
    }

    .search-input::placeholder {
        color: #9b9b9b;
    }

    .search-result-wrap {
        width: 100%;
        height: 169px;
        overflow-y: auto;
        margin-top: 19px;
        border-radius: 6px;
        background-color: #ffffff;
    }

    .no-search-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .no-search-result {
        width: 115px;
        height: 19px;
        opacity: 0.3;
        font-family: AppleSDGothicNeo;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.44px;
        color: #1c1c1c;
    }

    .new-member-wrap {
        margin-top: 20px;
    }

    .new-member-list-wrap {
        height: 169px;
        border-radius: 6px;
        background-color: #ffffff;
        margin-top: 30px;
    }

    .no-new-member {
        width: 165px;
        height: 19px;
        opacity: 0.3;
        font-family: AppleSDGothicNeo;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.44px;
        color: #1c1c1c;
    }

    .team-member-complete-button-wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .team-member-complete-button {
        margin-top: 60px;
        margin-right: 16px;
        width: 240px;
        height: 64px;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .team-member-complete-text {
        width: 120px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .new-member-clear-wrap {
        width: 73px;
        height: 24px;
        position: relative;
        top: -22px;
        left: 834px;
    }

    .new-member-clear-text {
        text-decoration: underline;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        letter-spacing: -0.73px;
        color: #9b9b9b;
    }
</style>
