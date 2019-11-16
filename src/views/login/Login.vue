<template>
    <div>
        <div v-if="!isMobile" class="body">
            <div class="container">
                <div class="main-container">
                    <div class="row" style="margin: 0">
                        <div class="login-container">
                            <div class="el-header">
                                <p>로그인</p>
                            </div>
                            <div class="el-main">
                                <form @submit.prevent="onSubmit">
                                    <input class="input-box" placeholder="아이디를 입력해주세요" v-model="uid">
                                    <input class="input-box" type="password" placeholder="비밀번호를 입력해주세요" v-model="password"
                                           style="margin-top: 16px">
                                    <br>
                                    <button type="submit" class="btn-login" :disabled='isDisabled'>
                                        로그인
                                    </button>
                                    <br>
                                    <router-link to="/signup">
                                        <button class="btn-signup">회원가입</button>
                                    </router-link>
                                </form>
                            </div>

                            <div class="el-footer">
                                <p>© 2019 Moim-construct Corp.</p>
                            </div>
                        </div>
                        <div class="login-logo">
                            <img src="@/assets/img/login-banner.png" width="100%" height="100%" style=" border-radius: 6px">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <MobileGuide v-if="isMobile">
        </MobileGuide>
    </div>
</template>

<script>
    import MobileDetect from 'mobile-detect';
    import {login, info} from "../../api/LoginAPI";
    import {
        SET_AUTH,
        SET_ID,
        SET_NAME,
        SET_ACTIVATED,
        SET_NEXTERS_NUMBER,
        SET_POSITION,
        SET_ROLE,
        SET_TOKEN, SET_UUID
    } from "../../consts/userType";
    import MobileGuide from '@/components/common/MobileGuide';
    import {SET_EMAIL, SET_HAS_TEAM, SET_SUBMIT_IDEA, SET_VOTE_COUNT, SET_VOTED} from '@/consts/userType';

    export default {
        name: 'Login',
        components: {MobileGuide},
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
                    .then(data => {
                        let token = data.data.accessToken;
                        info(token)
                            .then(data => {
                                this.goToPages(token, data.data)
                            })
                    })
                    .catch(err => {
                        alert('아이디와 비밀번호를 확인해주세요.', err);
                        this.duringLogin = false
                    });

                this.duringLogin = true;
            },
            goToPages(token, info) {
                this.$store.commit(SET_ID, info.id);
                this.$store.commit(SET_NAME, info.name);
                this.$store.commit(SET_ACTIVATED, info.activated);
                this.$store.commit(SET_NEXTERS_NUMBER, info.nextersNumber);
                this.$store.commit(SET_ROLE, info.role);
                this.$store.commit(SET_POSITION, info.position);
                this.$store.commit(SET_AUTH, true);
                this.$store.commit(SET_TOKEN, token);
                this.$store.commit(SET_UUID, info.uuid);

                this.$store.commit(SET_EMAIL, info.email);
                this.$store.commit(SET_HAS_TEAM, info.hasTeam);
                this.$store.commit(SET_SUBMIT_IDEA, info.submitIdea);
                this.$store.commit(SET_VOTE_COUNT, info.voteCount);
                this.$store.commit(SET_VOTED, info.voted);

                this.$router.push({
                    path: '/session/latest'
                })
            }
        },
        computed: {
            isDisabled() {
                return this.duringLogin
            },
            isMobile() {
                const mobileDetect = new MobileDetect(window.navigator.userAgent);
                return !!(mobileDetect.phone());
            }
        }
    }
</script>

<style src="./Login.css" scoped>
</style>
