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
                    <p class="header-sub">현재 나의 정보입니다. 수정하기를 통해 비밀번호와 직무를 변경할 수 있어요.</p>
                </div>

                <div class="el-main">
                    <div class="row">
                        <div class="col col-md-2 info-title">계정정보</div>
                        <div class="col col-md-10 info-body">
                            <b-form-group>
                                <p class="form-title">아이디</p>
                                <b-form inline>
                                    <b-form-input type="text" v-model="uid" disabled="disabled"> {{ uid }}
                                    </b-form-input>
                                </b-form>
                            </b-form-group>

                            <b-form-group>
                                <b-form inline>
                                    <b-form>
                                        <p class="form-title">현재 패스워드</p>
                                        <b-form-input v-validate="'required|min:8'" type="password"
                                                      v-model="curPassword" name="curPassword"
                                                      placeholder="영문, 숫자 8자 이상" ref="password"></b-form-input>
                                    </b-form>
                                    <b-form>
                                        <p class="form-title">새로운 패스워드</p>
                                        <b-form-input v-validate="'required|min:8'" type="password"
                                                      v-model="newPassword" name="password"
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
                                <b-form class="form-title">
                                    <button type="button" class="btn btn-success" v-on:click="passwordChange">
                                        패스워드 수정
                                    </button>
                                </b-form>
                            </b-form-group>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-md-2 info-title">개인정보</div>
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
                                <b-form class="form-title">
                                    <button type="button" class="btn btn-success" v-on:click="infoChange">
                                        내정보 수정
                                    </button>
                                </b-form>
                            </b-form-group>
                        </div>
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
                uid: '내아이디',
                curPassword: '',
                newPassword: '',
                confirmPassword: '',
                name: '내이름',
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
