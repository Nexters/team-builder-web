<template>
    <div>
        <div class="d-flex" style="margin-top: 30px">
            <div>
                <p class="header">넥스터즈 16기 활동 일반관리</p>
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
                <div class="date-picker">
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
                <div class="date-picker">
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

                <p class="sub-title" style="margin-left: 20px">아이디어 투표 횟수</p>

                <b-form-select class="select-idea-vote-count" v-model="classSelect" :options="classOptions">
                    <template slot="first">
                    </template>
                </b-form-select>
            </div>


            <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 25px">
                <p class="sub-title">선정 아이디어 확인</p>
                <div class="date-picker">
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
                <p class="sub-title">팀빌딩 모드</p>
                <toggle-button :value="teamBuildingSwitch"
                               :width="60"
                               :height="32"
                               color="#273EA5"
                               @change="teamBuildingSwitch = $event.value"
                               style="margin: 0"/>
            </div>
        </div>
    </div>

</template>

<script>
    import Layout from "../common/layout/Layout";
    import "vue-rocker-switch/dist/vue-rocker-switch.css";

    export default {
        data() {
            return {
                imageUrl: '',
                ideaRecruitStart: '',
                ideaRecruitEnd: '',
                ideaVoteStart: '',
                ideaVoteEnd: '',
                ideaSelectCheckStart: '',
                ideaSelectCheckEnd: '',
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
