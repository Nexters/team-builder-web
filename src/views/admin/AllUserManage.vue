<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px; margin-left: 70px;">
                <div class="header">
                    <p>회원관리 및 설정</p>
                </div>
                <div class="header-sub">
                    <p>넥스터즈 모임모임에 가입한 회원의 정보를 확인할 수 있고, 현재기수 활동 여부를 설정할 수 있습니다.
                        회원의 모임모임 활동내역을 체크해서 아이디어를 관리하세요 !</p>
                </div>

                <div class="user-manage-tab d-flex">
                    <div class="header-left">
                        <p class="user-count">전체회원 {{users.length}}명</p>
                    </div>

                    <div class="header-right">
                        <button class="btn-user-remove" @click="dismissUser()">
                            회원 제명
                        </button>

                        <div class="search-circle row" v-bind:style="searchBoxMouseHoverStyle">
                            <input type="search"
                                   class="search-box"
                                   placeholder="회원명과 아이디를 검색해주세요."
                                   v-on:input="search = $event.target.value"
                                   @focusin="searchFocus"
                                   @focusout="searchFocusOut"
                                   @keyup="filtering"
                                   @search="searchClear">
                            <img :src="require('../../assets/img/ico-search@2x.png')" width="22px" height="22px">
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <b-form-group>
                            <div class="titles">
                                <div class="flex title" style="width: 78px; padding-left: 26px; margin-bottom: -2px">
                                    <div class="custom-checkbox">
                                        <b-form-checkbox
                                                v-model="allSelected"
                                                @change="toggleAll"
                                        />
                                    </div>
                                </div>
                                <div class="title" style="width: 90px; text-align: center">
                                    가입날짜
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('createdAt')">
                                </div>
                                <div class="flex title" style="width: 90px; text-align: center">
                                    가입기수
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('nextersNumber')">
                                </div>
                                <div class="title" style="width: 80px; text-align: center">
                                    직군
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('position')">
                                </div>
                                <div class="title" style="width: 76px; margin-left: 10px">이름</div>
                                <div class="title" style="width: 186px">아이디</div>
                                <div class="title" style="width: 122px">
                                    아이디어 작성여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('submitIdea')">
                                </div>
                                <div class="title" style="width: 122px; margin-left: 18px">
                                    아이디어 투표여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('voted')">
                                </div>
                                <div class="title" style="width: 122px; margin-left: 37px">
                                    팀빌딩 여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('hasTeam')">
                                </div>
                                <div class="title" style="width: 160px; padding-left: 65px">
                                    활동여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('activated')">
                                </div>
                            </div>

                            <table class="board">
                                <tbody>
                                <div v-if="filteredUsers.length === 0" class="no-user-search"
                                     style="text-align: center; margin-top: 154px">
                                    ‘{{search}}’에 대한 검색결과가 없어요
                                </div>
                                <tr v-else class="list" v-for="user in filteredUsers"
                                    :key="user.id">
                                    <td class="flex"
                                        style="width: 70px; height: 20px; padding-left: 26px; padding-bottom: 2px">
                                        <div class="custom-checkbox">
                                            <b-form-checkbox
                                                    :value="user.uuid"
                                                    v-model="selected"
                                                    @change="toggle"
                                                    stacked
                                            />
                                        </div>
                                    </td>

                                    <td style="width: 80px; text-align: center">
                                        <div class="row-item" style="font-weight: 500">{{ user.createdAt | formatDate }}
                                        </div>
                                    </td>
                                    <td style="width: 76px; text-align: center">
                                        <div class="row-item">{{user.nextersNumber}}</div>
                                    </td>
                                    <td style="width: 74px; text-align: center">
                                        <div v-if="user.position === 'DEVELOPER'" class="row-item">
                                            개발자
                                        </div>
                                        <div v-else-if="user.position === 'DESIGNER'" class="row-item">
                                            디자이너
                                        </div>
                                    </td>
                                    <td style="width: 76px; padding-left: 10px">
                                        <div v-if="user.name.length <= 4" class="row-item">{{user.name}}</div>
                                        <div v-else class="row-item" @mouseover="user.name">{{user.name.substr(0,
                                            4)}}...
                                        </div>
                                    </td>
                                    <td style="width: 166px">
                                        <div class="row-item">{{user.id}}</div>
                                    </td>
                                    <td v-if="user.activated" style="width: 360px">
                                        <div class="row">
                                            <div style="width: 120px; margin-left: 17px">
                                                <div v-if="user.submitIdea" class="row-item select-box">
                                                    <p>작성</p>
                                                </div>
                                                <div v-else class="row-item unselect-box">
                                                    <p>미작성</p>
                                                </div>
                                            </div>
                                            <div style="width: 120px; margin-left: 20px">
                                                <div v-if="user.voted" class="row-item select-box">
                                                    <p>투표</p>
                                                </div>
                                                <div v-else class="row-item unselect-box">
                                                    <p>미투표</p>
                                                </div>
                                            </div>
                                            <div style="width: 120px; margin-left: 20px">
                                                <div v-if="user.hasTeam" class="row-item select-box">
                                                    <p>완료</p>
                                                </div>
                                                <div v-else class="row-item unselect-box">
                                                    <p>미완료</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-else style="width: 340px">
                                        <div class="row-item" style="color: #9b9b9b">
                                            현재 기수 활동회원이 아니에요.
                                        </div>
                                    </td>
                                    <td style="width: 163px; padding-left: 87px; margin-right: 32px">
                                        <toggle-button :value="user.activated"
                                                       :width="54"
                                                       :height="32"
                                                       color="#ff5000"
                                                       @change="userActivate(user.uuid, $event.value)"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </b-form-group>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import {
        addActiveUser,
        deleteActiveUser, dismissUser,
        getAllUsers
    } from "../../api/UserAPI";
    import Vue from 'vue';
    import moment from 'moment';

    export default {
        name: "AllUserManage",
        components: {Layout},
        data() {
            return {
                users: [],
                userViewList: [],
                search: '',
                searchBoxMouseHoverStyle: {},
                sortCreatedAtASC: true,
                sortNextersNumberASC: true,
                sortPositionASC: true,
                sortSubmitIdeaASC: false,
                sortVotedASC: false,
                sortHasTeamASC: false,
                sortActivatedASC: true,
                selected: [],
                allSelected: false
            }
        },
        methods: {
            moment,
            loadAllUsers() {
                getAllUsers()
                    .then(res => {
                        this.users = this.userViewList = res.data;
                        this.sorting('createdAt');
                        this.sorting('activated');
                    });
            },
            toggleAll(checked) {
                let selected = [];
                if (checked) {
                    this.users.forEach(function (user) {
                        selected.push(user.uuid);
                    });
                }
                this.selected = selected;
            },
            toggle(checked) {
                if (checked) {
                    if (this.users.length === this.selected.length + 1) {
                        this.allSelected = true;
                        this.toggleAll(true)
                    }
                } else {
                    this.allSelected = false;
                }
            },
            sorting(by) {
                let isAsc = true;
                if (by === 'createdAt') {
                    this.sortCreatedAtASC = !this.sortCreatedAtASC;
                    isAsc = this.sortCreatedAtASC
                } else if (by === 'nextersNumber') {
                    this.sortNextersNumberASC = !this.sortNextersNumberASC;
                    isAsc = this.sortNextersNumberASC
                } else if (by === 'position') {
                    this.sortPositionASC = !this.sortPositionASC;
                    isAsc = this.sortPositionASC
                } else if (by === 'submitIdea') {
                    this.sortSubmitIdeaASC = !this.sortSubmitIdeaASC;
                    isAsc = this.sortSubmitIdeaASC
                } else if (by === 'voted') {
                    this.sortVotedASC = !this.sortVotedASC;
                    isAsc = this.sortVotedASC
                } else if (by === 'hasTeam') {
                    this.sortHasTeamASC = !this.sortHasTeamASC;
                    isAsc = this.sortHasTeamASC
                } else if (by === 'activated') {
                    this.sortActivatedASC = !this.sortActivatedASC;
                    isAsc = this.sortActivatedASC
                }

                this.users = this.users.sort((idea1, idea2) => {
                    const position1 = idea1[by];
                    const position2 = idea2[by];

                    if (isAsc) {
                        if (position1 < position2) return -1;
                        if (position1 > position2) return 1;
                    } else {
                        if (position1 < position2) return 1;
                        if (position1 > position2) return -1;
                    }
                })
            },
            userActivate(id, activated) {
                if (activated) {
                    addActiveUser(id)
                        .then(res => {
                            for (let i = 0; i < this.users.length; i++) {
                                if (this.users[i].uuid === id) {
                                    this.users[i].activated = !this.users[i].activated;
                                    break;
                                }
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    deleteActiveUser(id)
                        .then(res => {
                            for (let i = 0; i < this.users.length; i++) {
                                if (this.users[i].uuid === id) {
                                    this.users[i].activated = !this.users[i].activated;
                                    break;
                                }
                            }
                        })
                        .catch(err => console.log(err))
                }
            },
            filtering() {
                // 한글
                if (this.search.match('^[ㄱ-ㅎ가-힣]*$')) {
                    const ChosungSearch = require('hangul-chosung-search-js');
                    const filterArray = this.users.map(element => element.name)
                        .concat(this.users.map(element => element.id));

                    const filteredList = ChosungSearch.searchList(this.search, filterArray, true);

                    this.userViewList = this.users.filter(post => {
                        return filteredList.includes(post.id) || filteredList.includes(post.name)
                    });
                    return;
                }

                // 영어
                const searchQuery = this.search.toLowerCase();
                this.userViewList = this.users.filter(idea => {
                    if (idea.id.toLowerCase().includes(searchQuery)) return true;
                    if (idea.name.toLowerCase().includes(searchQuery)) return true;
                })
            },
            searchFocus() {
                this.searchBoxMouseHoverStyle = {
                    'outline': 'none',
                    'border': '1px solid #273EA5',
                    'box-shadow': 'none'
                };
            },
            searchFocusOut() {
                this.searchBoxMouseHoverStyle = {};
            },
            searchClear() {
                this.filtering()
            },
            dismissUser() {
                let representUserName = this.findUsernameByUuid(this.selected[0]);
                let message;
                if (this.selected.length === 1) {
                    message = representUserName + '님을 정말로 제명하시겠습니까?'
                } else {
                    message = representUserName + '님 외 ' + (this.selected.length - 1) + '명을 정말로 제명하시겠습니까?.'
                }
                this.$store.commit('common/showConfirm', {
                    confirmMessage: message,
                    confirmYesButtonText: '확인',
                    confirmNoButtonText: '취소',
                    confirmNoFunction: null,
                    confirmYesFunction: () => {
                        dismissUser(this.selected)
                            .then(data => {
                                let message;
                                if (this.selected.length === 1) {
                                    message = representUserName + '님을 제명하였습니다.'
                                } else {
                                    message = representUserName + '님 외 ' + (this.selected.length - 1) + '명을 제명하였습니다.'
                                }
                                window.vm.$notify.success({
                                    title: '회원제명',
                                    message: message
                                });
                            })
                            .catch(err => {
                                window.vm.$notify.error({
                                    title: '회원제명',
                                    message: '회원제명에 실패하였습니다. 관리자에게 문의해주세요.'
                                });
                            });
                    }
                });
            },
            findUsernameByUuid(uuid) {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].uuid === uuid) {
                        return this.users[i].name;
                    }
                }
                return '';
            }
        },
        computed: {
            filteredUsers() {
                return this.userViewList;
            }
        },
        created() {
            this.loadAllUsers();
        }
    }

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('YYYY.MM.DD')
        }
    })
</script>

<style>
    div.custom-control.custom-checkbox {
        display: table-cell;
        vertical-align: center;
    }

    label.custom-control-label::before, label.custom-control-label::after {
        display: table-cell;
        vertical-align: center;
        width: 20px;
        height: 20px;
    }

    input#checkbox-1.custom-control-input {
        display: table-cell;
        vertical-align: center;
        width: 0;
        height: 0;
    }
</style>

<style src="./AllUserManage.css" scoped>
</style>
