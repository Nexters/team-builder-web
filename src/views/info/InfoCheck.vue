<template>
    <div>
        <div class="d-flex" style="margin-top: 30px">
            <div>
                <p class="header">개인정보</p>
            </div>
            <div class="ml-auto">
                <button class="btn-apply" @click="infoChange()">
                    수정하기
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
                <div class="info-title">직무</div>
                <div class="info-body">{{ $store.getters.getPosition }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import {login} from "../../api/LoginAPI"

    export default {
        name: 'Info',
        components: {Layout},
        props: ['isAccess'],
        data() {
            return {
                password: '',
            }
        },
        methods: {
            infoChange() {
                login(this.$store.getters.getId, this.password)
                    .then(res => {
                        this.$emit('update:isAccess', true)
                    })
                    .catch(err => {
                        alert('비밀번호를 확인해주세요!');
                    });
            }
        }
    }
</script>

<style src="./InfoCheck.css" scoped>
</style>
