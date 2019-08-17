<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px">
                <div class="header">
                    <p>인증코드 설정 및 전체 회원관리 설정</p>
                </div>
                <div class="header-sub">
                    <p>회원가입 시 입력하는 인증코드를 변경할 수 있어요. 또한, 전체회원 리스트에서 현재 활동기수 회원을 추가할 수 있어요.</p>
                </div>

                <div class="certify">
                    <p>인증코드</p>
                    <div class="flex">
                        <input class="input-box" placeholder="인증코드를 입력해주세요" v-model="accessCode">
                        <button type="submit" class="btn-certify-apply">
                            적용하기
                        </button>
                    </div>
                </div>

                <div class="user-manage-tab d-flex">
                    <p>전체회원 500명</p>
                    <div class="ml-auto">
                        <button class="btn-active-user-add">
                            활동회원추가
                        </button>
                        <button class="btn-user-remove">
                            회원제거
                        </button>
                        <input class="search-box" placeholder="회원명과 아이디를 검색해주세요." v-model="search">
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <b-form-group>
                            <div class="titles">
                                <div class="flex title" style="width: 78px; padding-left: 26px">
                                    <div class="custom-checkbox">
                                        <b-form-checkbox
                                                v-model="allSelected"
                                                @change="toggleAll"
                                        />
                                    </div>
                                </div>
                                <div class="flex title" style="width: 100px">
                                    가입기수
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('id')">
                                </div>
                                <div class="title" style="width: 86px">
                                    직군
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('position')">
                                </div>
                                <div class="title" style="width: 86px">이름</div>
                                <div class="title" style="width: 594px">아이디</div>
                                <div class="title" style="width: 160px">
                                    활동여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('isActive')">
                                </div>
                                <div class="title" style="width: 96px">
                                    가입날짜
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('joinDate')">
                                </div>
                            </div>

                            <table class="board">
                                <tbody>
                                <tr class="list" v-for="user in filteredUsers" :key="user.id">
                                    <td class="flex titles"
                                        style="width: 78px; height: 20px; padding-left: 26px; padding-bottom: 5px">
                                        <div class="custom-checkbox">
                                            <b-form-checkbox
                                                    :value="user.id"
                                                    v-model="selected"
                                                    stacked
                                            />
                                        </div>
                                    </td>
                                    <td style="width: 100px;">
                                        <div class="flex title" style="width: 100px">{{user.id}}</div>
                                    </td>
                                    <td style="width: 86px;">
                                        <div class="title" style="width: 86px">직군</div>
                                    </td>
                                    <td style="width: 86px;">
                                        <div class="title" style="width: 86px">{{user.username}}</div>
                                    </td>
                                    <td style="width: 594px;">
                                        <div class="title" style="width: 594px">{{user.name}}</div>
                                    </td>
                                    <td style="width: 160px;">
                                        <div class="title" style="width: 160px">활동여부</div>
                                    </td>
                                    <td style="width: 96px;">
                                        <div class="title" style="width: 96px">가입날짜</div>
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
    import {getAllUsers} from "../../api/UserAPI";

    export default {
        name: "AllUserManage",
        components: {Layout},
        data() {
            return {
                users: [],
                search: '',
                sortActiveSessionASC: false,
                sortPositionASC: false,
                sortIsActiveASC: false,
                sortJoinDateASC: false,
                ideaListLength: 3,
                accessCode: '1521',
                selected: [],
                allSelected: false,
            }
        },
        methods: {
            loadAllUsers() {
                getAllUsers()
                    .then(res => {
                        this.users = res.data;
                    });
            },
            toggleAll(checked) {
                let selected = [];
                if (checked) {
                    this.users.forEach(function (user) {
                        selected.push(user.id);
                    });
                }
                this.selected = selected;
            },
            sorting(by) {
                let isAsc = true;
                if (by === 'id') {
                    this.sortActiveSessionASC = !this.sortActiveSessionASC;
                    isAsc = this.sortActiveSessionASC
                } else if (by === 'position') {
                    this.sortPositionASC = !this.sortPositionASC;
                    isAsc = this.sortPositionASC
                } else if (by === 'isActive') {
                    this.sortIsActiveASC = !this.sortIsActiveASC;
                    isAsc = this.sortIsActiveASC
                } else if (by === 'joinDate') {
                    this.sortJoinDateASC = !this.sortJoinDateASC;
                    isAsc = this.sortJoinDateASC
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
            }
        },
        computed: {
            filteredUsers() {
                return this.users.filter(post => {
                    return post.name.toLowerCase().includes(this.search.toLowerCase()) ||
                        post.username.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
        created() {
            this.loadAllUsers();
        }
    }
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
