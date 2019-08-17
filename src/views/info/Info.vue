<template>
    <Layout>
        <template v-slot:body>
            <div class="main-container">

                <div class="d-flex" style="margin-top: 30px">
                    <div>
                        <p class="header">개인정보</p>
                    </div>
                    <div class="ml-auto">
                        <button class="btn-apply">
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
                        <div class="info-body">15기</div>
                    </div>

                    <div class="row">
                        <div class="info-title">이름</div>
                        <div class="info-body">양해인</div>
                    </div>

                    <div class="row">
                        <div class="info-title">아이디</div>
                        <div class="info-body">hyenny33</div>
                    </div>

                    <div class="row">
                        <div class="info-title">현재 비밀번호</div>
                        <input class="password-box" type="password" placeholder="현재 비밀번호를 입력해주세요" v-model="password">
                    </div>

                    <div class="row">
                        <div class="info-title">직무</div>
                        <div class="info-body">디자이너</div>
                    </div>

                </div>
            </div>

        </template>
    </Layout>
</template>

<script>
    import {signup} from "../../api/SignupAPI"
    import {SET_ID, SET_AUTH, SET_TOKEN} from "../../consts/userType"
    import Layout from '@/components/common/layout/Layout';

    export default {
        name: 'Info',
        components: {Layout},
        data() {
            return {
                password: '',
            }
        },
        methods: {
            passwordChange() {
                alert("비밀번호 수정")
            },
            infoChange() {
                alert("내정보 수정")
            }
        },
        computed: {
            isDisabled() {
                return this.duringLogin
            }
        }
    }
</script>

<style src="./Info.css" scoped>
</style>
