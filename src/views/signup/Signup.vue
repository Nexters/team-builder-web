<template>
    <div class="Signup">
        <div class="container">
            <div class="row header">
                <img src="@/assets/logo.png" width="40px" height="40px">
                <p> 현재 기수는 15기 입니다.</p>
            </div>

            <div class="main-container">

                <div class="col col-md-2 el-header">회원가입</div>

                <div class="el-main">
                    <div class="row">
                        <div class="col col-md-2 info-title">계정정보</div>
                        <div class="col col-md-10 info-body">
                            <b-form-group>
                                <p class="form-title">아이디</p>
                                <b-form inline>
                                    <b-form-input type="text" v-model="uid"></b-form-input>
                                    <button type="button" class="btn btn-success" v-on:click="idDuplicateCheck">
                                        중복확인
                                    </button>
                                </b-form>
                            </b-form-group>

                            <b-form-group>
                                <b-form inline>
                                    <b-form>
                                        <p class="form-title">패스워드</p>
                                        <b-form-input v-validate="'required|min:8'" type="password"
                                                      v-model="password" name="password"
                                                      placeholder="영문, 숫자 8자 이상" ref="password"></b-form-input>
                                    </b-form>
                                    <b-form>
                                        <p class="form-title">패스워드 확인</p>
                                        <b-form-input v-validate="'required|confirmed:password'" type="password"
                                                      v-model="confirmPassword"
                                                      name="password_confirmation" placeholder="영문, 숫자 8자 이상"
                                                      data-vv-as="password"></b-form-input>
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
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-md-2 info-title">계정정보</div>
                        <div class="col col-md-10 info-body">
                            <b-form-group>
                                <p class="form-title">이름</p>
                                <b-form inline>
                                    <b-form-input type="text" v-model="name"></b-form-input>
                                </b-form>
                            </b-form-group>

                            <b-form-group>
                                <b-form inline>
                                    <b-form>
                                        <p class="form-title">가입기수</p>
                                        <b-form-select v-model="classSelect" :options="classOptions" class="mb-3">
                                            <template slot="first">
                                                <option :value="null" disabled>기수 선택</option>
                                            </template>
                                        </b-form-select>
                                    </b-form>
                                    <b-form>
                                        <p class="form-title">직군</p>
                                        <b-form-group>
                                            <b-form-radio-group
                                                    class="mb-3"
                                                    id="btn-radios-2"
                                                    v-model="jobSelect"
                                                    :options="jobOptions"
                                                    buttons
                                                    button-variant="outline-primary"
                                                    name="radio-btn-outline"
                                            ></b-form-radio-group>
                                        </b-form-group>
                                    </b-form>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-md-2 info-title">보안</div>
                        <div class="col col-md-10 info-body">
                            <b-form-group>
                                <p class="form-title">인증코드</p>
                                <b-form inline>
                                    <b-form-input type="text" v-model="accessCode"></b-form-input>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>
                </div>
            </div>

            <form @submit.prevent="onSubmit" style="text-align: right">
                <button type="submit"
                        class="btn btn-success"
                        :disabled='isDisabled'
                        style="margin-top: 20px; padding: 10px 50px; margin-bottom: 50px; font-size: 20px">
                    가입하기
                </button>
            </form>
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
                classSelect: null,
                classOptions: [
                    {value: '15기', text: '15기'},
                    {value: '16기', text: '16기'}
                ],
                jobSelect: null,
                jobOptions: [
                    {text: '개발자  ', value: 'develop'},
                    {text: '디자이너', value: 'designer'}
                ]
            }
        },
        methods: {
            onSubmit() {
                const uid = this.uid;
                const upassword = this.password;
                const uname = this.name;
                const uclass = this.classSelect;
                const ujob = this.jobSelect;
                const accessCode = this.accessCode;

                if (!uid || !upassword || !uname || !uclass || !ujob || !accessCode || this.errors.any()) {
                    return false
                }

                signup(uid, upassword, uname, uclass, ujob, accessCode)
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
                alert("아이디 중복확인")
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
</style>
