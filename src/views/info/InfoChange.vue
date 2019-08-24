<template>
    <div>
        <div class="d-flex" style="margin-top: 30px">
            <div>
                <p class="header">개인정보</p>
            </div>
            <div class="ml-auto">
                <button class="btn-apply" @click="infoChange()">
                    적용하기
                </button>
            </div>
        </div>

        <div>
            <p class="d-flex header-sub">현재 나의 정보입니다. 수정하기를 통해 비밀번호와 직무를 변경할 수 있어요.</p>
        </div>

        <div class="el-main">
            <div class="row">
                <div class="info-title">계정정보</div>
                <div class="info-body">{{ $store.getters.getNextersNumber }}</div>
            </div>

            <div class="row">
                <div class="info-title">이름</div>
                <div class="info-body">{{ $store.getters.getName }}</div>
            </div>

            <div class="row">
                <div class="info-title">아이디</div>
                <div class="info-body">{{ $store.getters.getId }}</div>
            </div>

            <div class="row">
                <div class="info-title">현재 비밀번호</div>
                <input class="password-box" type="password" placeholder="현재 비밀번호를 입력해주세요" v-model="password">
            </div>

            <div class="row">
                <div class="info-title">새 비밀번호</div>
                <input class="password-box" type="password" placeholder="새 비밀번호를 입력해주세요" v-model="newPassword">
                <p v-if="0 < newPassword.length && newPassword.length < 8" class="password-confirm-box">영문,숫자 8자
                    이상 입력하세요.</p>
            </div>

            <div class="row">
                <div class="info-title">새 비밀번호 확인</div>
                <input class="password-box" type="password" placeholder="새 비밀번호를 다시 입력해주세요"
                       v-model="checkPassword">
                <p v-if="0 < checkPassword.length  && newPassword !== checkPassword" class="password-confirm-box">
                    비밀번호가 일치하지 않습니다.</p>
            </div>

            <div class="row">
                <div class="info-title">직무</div>
                <b-form>
                    <b-form-select v-model="positionSelect" :options="positionOptions" class="position-select">
                        <template slot="first">
                            <option :value="null" disabled>직군선택</option>
                        </template>
                    </b-form-select>
                </b-form>
            </div>

        </div>
    </div>
</template>

<script>
    import {updateUserInfo} from "../../api/InfoChangeAPI"

    export default {
        name: 'Info',
        props: ['isAccess'],
        data() {
            return {
                password: '',
                newPassword: '',
                checkPassword: '',
                positionSelect: null,
                positionOptions: [
                    {text: '개발자', value: 'DEVELOPER'},
                    {text: '디자이너', value: 'DESIGNER'}
                ]
            }
        },
        methods: {
            infoChange() {
                updateUserInfo(this.newPassword, this.password, this.positionSelect)
                    .then(res => {
                        alert("수정 완료!")
                        this.$emit('update:isAccess', false)
                    })
                    .catch(err => {
                        alert('수정 실패 ㅜ');
                    });
            }
        },
        destroyed() {
            this.$emit('update:isAccess', false)
        }
    }
</script>

<style src="./InfoChange.css" scoped>
</style>
