<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px">
                <div class="d-flex" style="margin-top: 30px">
                    <div>
                        <p class="header">넥스터즈 {{sessionNumber}}기 활동 일반관리</p>
                    </div>
                    <div class="ml-auto">
                        <button class="btn-apply">
                            적용하기
                        </button>
                    </div>
                </div>

                <div>
                    <p class="header-sub">활동기수의 로고 변경 및 아이디어 모집부터 팀빌딩까지 일정을 정할 수 있어요.</p>
                </div>

                <div class="d-flex" style="margin-top: 70px">
                    <div>
                        <p class="main-title">로고관리</p>
                    </div>
                </div>

                <div class="d-flex" style="margin-top: 12px">
                    <input class="logo-input-box" v-model="imageUrl" disabled="">
                    <div class="filebox">
                        <label for="filename">업로드</label>
                        <input type="file" id="filename" class="upload-hidden" @change="onFileChange">
                    </div>
                </div>

                <div style="margin-top: 80px">
                    <p class="main-title">일정관리</p>

                    <div class="d-flex" style="margin-bottom: 10px">
                        <p style="margin-left: 168px">시작일</p>
                        <p style="margin-left: 277px">종료일</p>
                    </div>

                    <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 12px">
                        <p class="sub-title">아이디어 모집</p>
                        <div class="date-picker" style="margin-left: 32px">
                            <el-date-picker
                                    v-model="ideaRecruitStart"
                                    type="date"
                                    placeholder="시작일을 선택해주세요">
                            </el-date-picker>
                        </div>
                        <div class="date-picker" style="margin-left: 20px">
                            <el-date-picker
                                    v-model="ideaRecruitEnd"
                                    type="date"
                                    placeholder="종료일을 선택해주세요">
                            </el-date-picker>
                        </div>
                    </div>


                    <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 12px">
                        <p class="sub-title">아이디어 투표</p>
                        <div class="date-picker" style="margin-left: 32px">
                            <el-date-picker
                                    v-model="ideaVoteStart"
                                    type="date"
                                    placeholder="시작일을 선택해주세요"
                                    format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                        <div class="date-picker" style="margin-left: 20px">
                            <el-date-picker
                                    v-model="ideaVoteEnd"
                                    type="date"
                                    placeholder="종료일을 선택해주세요"
                                    format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>

                        <p class="sub-title" style="margin-left: 50px">아이디어 투표 횟수</p>

                        <b-form-select class="select-idea-vote-count" v-model="classSelect" :options="classOptions">
                            <template slot="first">
                            </template>
                        </b-form-select>
                    </div>


                    <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 12px">
                        <p class="sub-title">선정 아이디어 확인</p>
                        <div class="date-picker" style="margin-left: 32px">
                            <el-date-picker
                                    v-model="ideaSelectCheckStart"
                                    type="date"
                                    placeholder="시작일을 선택해주세요">
                            </el-date-picker>
                        </div>
                        <div class="date-picker" style="margin-left: 20px">
                            <el-date-picker
                                    v-model="ideaSelectCheckEnd"
                                    type="date"
                                    placeholder="종료일을 선택해주세요">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 100px">
                        <p class="sub-title">
                            팀빌딩 모드
                            <span data-tooltip-text='팀빌딩 모드로 설정하면 일반회원의 아이디어 탭에서 아이디어 작성이 가능합니다.
                        관리자는 회원이 작성한 아이디어를 관리자 아이디어 탭에서 선정해,
                        팀빌딩 목록에서 볼 수 있습니다.
                        오프라인 팀빌딩 시 급조된 아이디어를 위한 기능입니다.'>
                        <img class="claim_mark" :src="require('../../assets/img/ico-table-tag@2x.png')">
                    </span>
                        </p>

                        <div class="date-picker" style="margin-left: 32px">
                            <el-date-picker
                                    v-model="teamBuildingDate"
                                    type="date"
                                    placeholder="팀빌딩 날짜를 선택해주세요">
                            </el-date-picker>
                        </div>
                        <toggle-button :value="teamBuildingSwitch"
                                       :width="60"
                                       :height="32"
                                       color="#273EA5"
                                       @change="teamBuildingSwitch = $event.value"
                                       style="margin: 0 0 0 20px"/>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import "vue-rocker-switch/dist/vue-rocker-switch.css";

    export default {
        data() {
            return {
                sessionNumber: this.$route.params.sessionNumber,
                imageUrl: '',
                ideaRecruitStart: '',
                ideaRecruitEnd: '',
                ideaVoteStart: '',
                ideaVoteEnd: '',
                ideaSelectCheckStart: '',
                ideaSelectCheckEnd: '',
                teamBuildingDate: '',
                classSelect: '2',
                classOptions: [
                    {value: '1', text: '1'},
                    {value: '2', text: '2'},
                    {value: '3', text: '3'},
                    {value: '4', text: '4'}
                ],
                teamBuildingSwitch: true
            }
        },
        name: "ActiveUser",
        components: {
            Layout
        },
        methods: {
            onFileChange(e) {
                //const file = e.target.files[0];
                //this.imageUrl = URL.createObjectURL(file);
                this.imageUrl = e.target.files[0].name
                console.log(e)
            }
        },
        created() {
            this.imageUrl = require('@/assets/logo.png');
        }
    }
</script>

<style>
    [data-tooltip-text]:hover {
        position: relative;
    }

    [data-tooltip-text]:hover:after {
        content: attr(data-tooltip-text);

        width: 230px;
        position: absolute;
        top: 100%;
        left: -80px;

        background-image: url("../../assets/img/group-9@2x.png");
        background-repeat: no-repeat;
        background-size: cover;
        color: #000000;
        font-size: 14px;

        padding: 35px 5px 10px 5px;
        z-index: 9999;
    }

    div.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
        width: 300px;
    }

    .date-picker, input.el-input__inner {
        width: 300px;
        height: 56px;
        border-radius: 6px;
        border: solid 1px #eeeeee;
        background-color: #ffffff;
    }

    .date-picker:focus, input.el-input__inner:focus {
        outline: none;
        border: 1px solid #273EA5;
        box-shadow: none;
    }
</style>

<style src="./GeneralManage.css" scoped>
</style>
