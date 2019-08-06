<template>
    <div class="Login">
        <div class="container">
            <div class="row header">
                <img src="@/assets/logo.png" width="40px" height="40px">
                <p> 현재 기수는 15기 입니다.</p>
            </div>
            <div class="main-container">
                <div class="row" style="margin: 0">
                    <div class="col col-md-6 login-container">
                        <div class="el-header">로그인</div>
                        <div class="el-main">
                            <form @submit.prevent="onSubmit">
                                <p align="left">아이디</p>
                                <input placeholder="Enter your ID" v-model="uid" style="width: 100%">
                                <p>비밀번호</p>
                                <input placeholder="Enter your password" v-model="password" style="width: 100%">
                                <br>
                                <button type="submit" class="btn btn-success" :disabled='isDisabled' style="width: 100%; margin-top: 30px">
                                    로그인
                                </button>
                                <br>
                                <router-link to="/signup">
                                    <button class="btn btn-info" style="width: 100%">회원가입</button>
                                </router-link>
                            </form>
                        </div>
                    </div>
                    <div class="col col-md-6 login-logo">
                        <img src="@/assets/logo.png" width="100%" height="100%">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {login} from "../../api/LoginAPI"

    export default {
        name: 'Login',
        data() {
            return {
                uid: '',
                password: '',
                duringLogin: false,
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                url: '@/assets/logo.png'
            }
        },
        methods: {
            onSubmit() {
                const uid = this.uid;
                const password = this.password;

                if (!uid || !password) {
                    return false
                }

                login(uid, password)
                    .then(res => {
                        this.goToPages(res.data)
                    })
                    .catch(err => {
                        alert('Login fail!', err);
                        this.duringLogin = false
                    });

                this.duringLogin = true;
                console.log('waiting')
            },
            goToPages(data) {
                this.$store.commit('setId', data.id);
                this.$store.commit('setAuth', true);
                this.$store.commit('setToken', data.key);
                this.$router.push({
                    path: '/'
                })
            }
        },
        computed: {
            isDisabled() {
                return this.duringLogin
            }
        }
    }
</script>

<style src="./Login.css" scoped>
</style>
