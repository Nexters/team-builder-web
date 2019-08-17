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
                                        <b-form-input class="input-box" v-validate="'required|min:8'" type="password"
                                                      v-model="password" name="password"
                                                      placeholder="비밀번호를 입력해주세요." ref="password"></b-form-input>
                                    </b-form>
                                    <b-form>
                                        <b-form-input class="input-box" v-validate="'required|confirmed:password'"
                                                      type="password" v-model="confirmPassword"
                                                      name="password_confirmation" placeholder="비밀번호를 다시 입력해주세요."
                                                      data-vv-as="password" style="margin-left: 15px;"></b-form-input>
                                    </b-form>
                                    <b-form>
                                        <div class="alert-danger" v-show="errors.any()">
                                            <div v-if="errors.has('password')">
                                                {{ errors.first('password') }}
                                            </div>
                                            <div v-if="errors.has('password_confirmation')">
                                                {{ errors.first('password_confirmation') }}
                                            </div>
                                        </div>
                                    </b-form>
                                </b-form>
                                <p class="password-check-info">영문,숫자 8자 이상 입력하세요.</p>
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
                                </b-form>
                            </b-form-group>

                            <b-form-group>
                                <b-form class="row">
                                    <b-form>
                                        <b-form-select v-model="nextersNumberSelect" :options="nextersNumberOptions"
                                                       class="nexters-number-select">
                                            <template slot="first">
                                                <option :value="null" disabled>기수</option>
                                            </template>
                                        </b-form-select>
                                    </b-form>
                                    <b-form>
                                        <b-form-select v-model="positionSelect" :options="positionOptions" class="position-select">
                                            <template slot="first">
                                                <option :value="null" disabled>직군선택</option>
                                            </template>
                                        </b-form-select>
                                    </b-form>
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
    import {signup} from "../../api/SignupAPI"
    import {SET_ID, SET_AUTH, SET_TOKEN} from "../../consts/userType"

    export default {
        name: 'Signup',
        data() {
            return {
                uid: '',
                password: '',
                confirmPassword: '',
                name: '',
                accessCode: '',
                duringLogin: false,
                nextersNumberSelect: null,
                nextersNumberOptions: [
                    {text: '15기', value: 15},
                    {text: '16기', value: 16}
                ],
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
                const accessCode = this.accessCode;

                if (!uid || !upassword || !uname || !nextersNumber || !position || !accessCode || this.errors.any()) {
                    return false
                }

                signup(uid, upassword, uname, nextersNumber, position, accessCode)
                    .then(res => {
                        this.goToPages(res.data)
                    })
                    .catch(err => {
                        alert('Signup fail!', err);
                        this.duringLogin = false
                    });

                this.duringLogin = true;
                console.log('waiting')
            },
            goToPages(data) {
                this.$store.commit(SET_ID, data.id);
                this.$store.commit(SET_AUTH, true);
                this.$store.commit(SET_TOKEN, 'temp_key');
                this.$router.push({
                    name: 'Login'
                })
            },
            idDuplicateCheck() {
                alert("사용중인 아이디입니다.")
            }
        },
        computed: {
            isDisabled() {
                return this.duringLogin
            }
        }
    }
</script>

<style src="./Signup.css" scoped>
</style>
