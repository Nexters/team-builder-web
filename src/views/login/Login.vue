<template>
    <div class="Login">
        <div class="container">
            <div class="row header">
                <img src="@/assets/logo.png" width="40px" height="40px">
                <p> 현재 기수는 15기 입니다.</p>
            </div>
            <div class="main-container">
                <div class="row justify-content-md-center">
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

<style scoped>
    .header {
        margin: 0 20px 20px 0;
        font-weight: bolder;
    }

    .header > p {
        margin: 0;
        vertical-align: middle;
        line-height: 40px;
    }

    .main-container {
        border: 1px solid;
    }

    .el-header {
        color: #333;
        text-align: left;
        margin: 70px 50px 0 50px;
        font-weight: bold;
        font-size: 26px;
    }

    .el-main {
        color: #333;
        text-align: left;
        line-height: 50px;
        margin: 0 50px 30px 50px;
        font-weight: bolder;
    }

    .el-main > form > p {
        margin: 0;
    }

    .login-logo {
        border: 1px solid #bbc5d6;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

</style>
