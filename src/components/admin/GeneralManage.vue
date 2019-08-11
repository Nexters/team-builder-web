<template>
    <div>
        <div class="d-flex" style="margin-top: 30px">
            <div>
                <p class="main-title">로고관리</p>
            </div>
            <div class="ml-auto">
                <button class="btn-lg btn-success">
                    적용하기
                </button>
            </div>
        </div>

        <div class="d-flex" style="margin-bottom: 50px">
            <img v-if="imageUrl" :src="imageUrl" style="width: 300px; height: 300px"/>
            <div class="filebox">
                <label for="filename">업로드</label>
                <input type="file" id="filename" class="upload-hidden" @change="onFileChange">
            </div>
        </div>

        <div>
            <p class="main-title">일정관리</p>

            <div class="d-flex">
                <p style="margin-left: 250px">시작일</p>
                <p style="margin-left: 230px">종료일</p>
            </div>

            <div class="sub-item-row d-flex align-items-center">
                <p class="sub-title">아이디어 모집</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaRecruitStart"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>
                <p style="margin: 0 20px">-</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaRecruitEnd"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>
            </div>


            <div class="sub-item-row d-flex align-items-center">
                <p class="sub-title">아이디어 투표</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaVoteStart"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>
                <p style="margin: 0 20px">-</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaVoteEnd"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>

                <p class="sub-title" style="margin-left: 20px">아이디어 투표 횟수 설정</p>

                <b-form-select v-model="classSelect" :options="classOptions" style="width: 200px">
                    <template slot="first">
                    </template>
                </b-form-select>
            </div>


            <div class="sub-item-row d-flex align-items-center">
                <p class="sub-title">선정 아이디어 확인</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaSelectCheckStart"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>
                <p style="margin: 0 20px">-</p>
                <div class="block">
                    <el-date-picker
                            v-model="ideaSelectCheckEnd"
                            type="date"
                            placeholder="Pick a day">
                    </el-date-picker>
                </div>
            </div>

            <div class="sub-item-row d-flex align-items-center">
                <p class="sub-title">팀 빌딩 모드</p>
                <RockerSwitch size="large" v-model="teamBuildingSwitch"/>
                <p style="margin-left: 20px">아이디어 모집과 아이디어 선정이 활성화됩니다.</p>
            </div>
        </div>
    </div>

</template>

<script>
    import Layout from "../common/layout/Layout";
    import RockerSwitch from "vue-rocker-switch";
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
            Layout,
            RockerSwitch
        },
        methods: {
            onFileChange(e) {
                const file = e.target.files[0];
                this.imageUrl = URL.createObjectURL(file);
            }
        },
        created() {
            this.imageUrl = require('@/assets/logo.png');
        }
    }
</script>

<style scoped>
    p {
        margin-bottom: 0;
    }

    .main-title {
        font-size: 30px;
        font-weight: bold;
        text-align: left;
        margin-bottom: 20px;
    }

    .sub-item-row {
        display: table-cell;
        vertical-align: middle;
        text-align: left;
        margin: 20px 0;
    }

    .sub-title {
        width: 200px;
        font-size: 14px;
        font-weight: bold;
    }

    .filebox {
        display: flex;
        align-items: flex-end;;
        justify-content: flex-end;
    }

    .filebox input[type="file"] {
        visibility: hidden;
    }

    .filebox label {
        display: inline-block;
        padding: .5em .75em;
        color: #999;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        background-color: #fdfdfd;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: .25em;
        margin: 0 0 0 10px;
    }


</style>
