<template>
    <div class="body">
        <div class="container">
            <div class="main-container">
                <div class="el-header">회원가입</div>

                <div class="el-main">
                    <div class="sub-id-info row">
                        <div class="info-title">계정정보</div>
                        <div class="info-body">
                            <b-form-group>
                                <b-form class="row">
                                    <b-form-input class="input-box" placeholder="아이디를 입력해주세요" type="text"
                                                  v-model="uid"></b-form-input>
                                    <button type="button" class="btn-duplicate-check" v-on:click="idDuplicateCheck">
                                        중복확인
                                    </button>
                                </b-form>
                            </b-form-group>

                            <b-form-group style="margin-top: 16px">
                                <b-form class="row">
                                    <b-form>
                                        <div class="password-circle row" v-bind:style="passwordBoxMouseHoverStyle">
                                            <b-form-input class="input-box-password" v-validate="'required|min:8'"
                                                          :type="passwordType" v-model="password"
                                                          @focusin="passwordFocus('password')"
                                                          @focusout="passwordFocusOut"
                                                          placeholder="비밀번호를 입력해주세요."></b-form-input>
                                            <img :src="passwordVisibleImage" width="18px" height="14px"
                                                 @click="visiblePassword('password')">
                                        </div>
                                        <div class="password-confirm-box">
                                            <p v-if="0 < password.length && password.length < 8">영문,숫자 8자 이상 입력하세요.</p>
                                        </div>
                                    </b-form>
                                    <b-form style="margin-left: 15px;">
                                        <div class="password-circle row"
                                             v-bind:style="confirmPasswordBoxMouseHoverStyle">
                                            <b-form-input class="input-box-password" :type="confirmPasswordType"
                                                          v-model="confirmPassword"
                                                          @focusin="passwordFocus('confirmPassword')"
                                                          @focusout="passwordFocusOut"
                                                          placeholder="비밀번호를 다시 입력해주세요."></b-form-input>
                                            <img :src="confirmPasswordVisibleImage" width="18px" height="14px"
                                                 @click="visiblePassword('confirmPassword')">
                                        </div>
                                        <div class="password-confirm-box">
                                            <p v-if="0 < confirmPassword.length  && confirmPassword !== password">
                                                비밀번호가 일치하지 않습니다.</p>
                                        </div>
                                    </b-form>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row" style="margin-right: 0">
                        <div class="info-title">개인정보</div>
                        <div class="info-body">
                            <b-form-group>
                                <b-form class="row">
                                    <b-form-input class="input-box" type="text" v-model="name"
                                                  placeholder="이름을 적어주세요."></b-form-input>
                                    <b-form-select v-model="nextersNumberSelect" :options="nextersNumberOptions"
                                                   class="nexters-number-select" style="margin-left: 15px;">
                                        <template slot="first">
                                            <option :value="null" disabled>가입기수</option>
                                        </template>
                                    </b-form-select>
                                    <b-form-select v-model="positionSelect" :options="positionOptions"
                                                   class="position-select">
                                        <template slot="first">
                                            <option :value="null" disabled>직군선택</option>
                                        </template>
                                    </b-form-select>
                                </b-form>
                            </b-form-group>

                            <b-form-group>
                                <b-form class="row">
                                    <b-form-input class="input-box" placeholder="이메일 주소를 입력해주세요."
                                                  type="text" v-model="email"></b-form-input>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row" style="margin-right: 0">
                        <div class="info-title">보안</div>
                        <div class="info-body">
                            <b-form-group>
                                <b-form class="row">
                                    <b-form-input class="input-box" placeholder="넥스터즈의 인증코드를 입력해주세요."
                                                  type="text" v-model="accessCode"></b-form-input>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>

                    <form @submit.prevent="onSubmit" style="text-align: right">
                        <button type="submit"
                                class="btn-complete"
                                :disabled='isDisabled'>
                            가입하기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isIdDuplicate, signup} from "../../api/SignupAPI"
    import {SET_ID, SET_AUTH, SET_TOKEN} from "../../consts/userType"

    export default {
        name: 'Signup',
        data() {
            return {
                uid: '',
                password: '',
                confirmPassword: '',
                passwordVisible: false,
                confirmPasswordVisible: false,
                passwordBoxMouseHoverStyle: {},
                confirmPasswordBoxMouseHoverStyle: {},
                passwordType: 'password',
                confirmPasswordType: 'password',
                passwordVisibleImage: require('../../assets/img/ico-view@2x.png'),
                confirmPasswordVisibleImage: require('../../assets/img/ico-view@2x.png'),
                name: '',
                accessCode: '',
                duringLogin: false,
                email: '',
                nextersNumberSelect: null,
                nextersNumberOptions: [],
                positionSelect: null,
                positionOptions: [
                    {text: '개발자', value: 'DEVELOPER'},
                    {text: '디자이너', value: 'DESIGNER'}
                ]
            }
        },
        methods: {
            onSubmit() {
                const uid = this.uid;
                const upassword = this.password;
                const uname = this.name;
                const nextersNumber = this.nextersNumberSelect;
                const position = this.positionSelect;
                const email = this.email;
                const accessCode = this.accessCode;

                if (!uid || !upassword || !uname || !nextersNumber || !position || !accessCode || !email || this.errors.any()) {
                    alert('모든 항목을 채워주세요.');
                    return false;
                }

                if (this.validEmail(email) === false) {
                    alert('이메일 형식을 맞춰주세요.')
                }

                signup(uid, upassword, uname, nextersNumber, position, email, accessCode)
                    .then(data => {
                        this.goToPages(data)
                    })
                    .catch(err => {
                        window.vm.$notify.error({
                            title: '회원가입',
                            message: err.response.data.message
                        });
                        this.duringLogin = false;
                    })
                ;

                this.duringLogin = true;
            },
            goToPages(data) {
                window.vm.$notify.success({
                    title: '회원가입',
                    message: '회원가입이 완료되었습니다.'
                });
                this.$store.commit(SET_ID, data.id);
                this.$store.commit(SET_AUTH, true);
                this.$store.commit(SET_TOKEN, 'temp_key');
                this.$router.push({
                    name: 'Login'
                })
            }
            ,
            idDuplicateCheck() {
                isIdDuplicate(this.uid)
                    .then(data => {
                        if (data.data.isIdUsable) {
                            alert('사용 가능한 아이디입니다.')
                        } else {
                            alert('사용중인 아이디입니다.')
                        }
                    })
                    .catch(err => {
                        alert(err.response.data.message)
                    });
            }
            ,
            visiblePassword(kind) {
                if (kind === 'password') {
                    if (this.passwordVisible) {
                        this.passwordType = 'password';
                        this.passwordVisibleImage = require('../../assets/img/ico-view@2x.png');
                    } else {
                        this.passwordType = 'text';
                        this.passwordVisibleImage = require('../../assets/img/ico-view-copy@2x.png');
                    }
                    this.passwordVisible = !this.passwordVisible
                } else if (kind === 'confirmPassword') {
                    if (this.confirmPasswordVisible) {
                        this.confirmPasswordType = 'password';
                        this.confirmPasswordVisibleImage = require('../../assets/img/ico-view@2x.png');
                    } else {
                        this.confirmPasswordType = 'text';
                        this.confirmPasswordVisibleImage = require('../../assets/img/ico-view-copy@2x.png');
                    }
                    this.confirmPasswordVisible = !this.confirmPasswordVisible
                }
            }
            ,
            passwordFocus(kind) {
                if (kind === 'password') {
                    this.passwordBoxMouseHoverStyle = {
                        'outline': 'none',
                        'border': '1px solid #273EA5',
                        'box-shadow': 'none'
                    };
                } else if (kind === 'confirmPassword') {
                    this.confirmPasswordBoxMouseHoverStyle = {
                        'outline': 'none',
                        'border': '1px solid #273EA5',
                        'box-shadow': 'none'
                    }
                }
            }
            ,
            passwordFocusOut() {
                this.passwordBoxMouseHoverStyle = this.confirmPasswordBoxMouseHoverStyle = {};
            }
            ,
            validEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            initSession() {
                for (let i = 1; i <= 16; i++) {
                    this.nextersNumberOptions.push({text: i + '기', value: i})
                }
            }
        },
        computed: {
            isDisabled() {
                return this.duringLogin
            }
        },
        created() {
            this.initSession();
        }
    }
</script>

<style src="./Signup.css" scoped>
</style>
