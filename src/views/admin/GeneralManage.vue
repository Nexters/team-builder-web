<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px; margin-left: 70px;">
                <div class="d-flex" style="margin-top: 30px">
                    <div>
                        <p class="header">넥스터즈 {{$store.state.main.session.sessionNumber}}기 활동 일반관리</p>
                    </div>
                    <div class="ml-auto">
                        <button class="btn-apply" @click="apply">
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
                        <input type="file" id="filename" class="upload-hidden" @change="onFileChange($event)">
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
                                    placeholder="종료일을 선택해주세요"
                                    @change="endDateCheck('ideaRecruit')">
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
                                    @change="startDateCheck('ideaVote')">
                            </el-date-picker>
                        </div>
                        <div class="date-picker" style="margin-left: 20px">
                            <el-date-picker
                                    v-model="ideaVoteEnd"
                                    type="date"
                                    placeholder="종료일을 선택해주세요"
                                    @change="endDateCheck('ideaVote')">>
                            </el-date-picker>
                        </div>

                        <p class="sub-title" style="margin-left: 50px">아이디어 투표 횟수</p>

                        <b-form-select class="select-idea-vote-count" v-model="maxVoteCount"
                                       :options="maxVoteCountOptions">
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
                                    placeholder="시작일을 선택해주세요"
                                    @change="startDateCheck('ideaSelectCheck')">
                            </el-date-picker>
                        </div>
                        <div class="date-picker" style="margin-left: 20px">
                            <el-date-picker
                                    v-model="ideaSelectCheckEnd"
                                    type="date"
                                    placeholder="종료일을 선택해주세요"
                                    @change="endDateCheck('ideaSelectCheck')">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="sub-item-row d-flex align-items-center" style="margin-bottom: 100px">
                        <p class="sub-title">
                            팀빌딩 모드
                            <el-popover
                                    placement="bottom"
                                    width="400"
                                    trigger="hover"
                                    content='팀빌딩 모드는 기간에 상관 없이 투표 기능을 제외한 모든 기능이 활성화됩니다.  오프라인 팀빌딩 시 생성된 아이디어를 위한 기능입니다.'>
                                <img class="claim_mark" slot="reference"
                                     :src="require('../../assets/img/ico-table-tag@2x.png')">
                            </el-popover>
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
    import {upload_logo} from "../../api/FileAPI";
    import {getSession, putSession} from "../../api/sessionApi";
    import moment from 'moment';

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
                maxVoteCount: '2',
                maxVoteCountOptions: [
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
            moment,
            onFileChange(e) {
                upload_logo(e.target.files[0].name, e.target.files[0], this.$store.getters.getId)
                    .then(res => {
                        alert('이미지 업로드 성공!')
                        this.imageUrl = e.target.files[0].name;
                    })
                    .catch(err => {
                        alert('이미지 업로드 실패 ㅜㅜ');
                    });
            },
            loadData() {
                getSession({sessionNumber: this.$route.params.sessionNumber})
                    .then(res => {
                        this.imageUrl = res.data.logoImageUrl;
                        this.maxVoteCount = res.data.maxVoteCount;
                        res.data.periods.forEach(period => {
                            if (period.periodType === 'IDEA_COLLECT') {
                                this.ideaRecruitStart = moment(period.startDate).format('YYYY-MM-DD');
                                this.ideaRecruitEnd = moment(period.endDate).format('YYYY-MM-DD');
                            } else if (period.periodType === 'IDEA_VOTE') {
                                this.ideaVoteStart = moment(period.startDate).format('YYYY-MM-DD');
                                this.ideaVoteEnd = moment(period.endDate).format('YYYY-MM-DD');
                            } else if (period.periodType === 'IDEA_CHECK') {
                                this.ideaSelectCheckStart = moment(period.startDate).format('YYYY-MM-DD');
                                this.ideaSelectCheckEnd = moment(period.endDate).format('YYYY-MM-DD');
                            } else if (period.periodType === 'TEAM_BUILDING') {
                                this.teamBuildingDate = moment(period.startDate).format('YYYY-MM-DD');
                            }
                        });
                        this.teamBuildingSwitch = res.data.teamBuildingMode;
                    })
            },
            apply() {
                let body = {
                    "logoImageUrl": this.imageUrl,
                    "maxVoteCount": this.maxVoteCount,
                    "periods": [
                        {
                            "periodType": "IDEA_COLLECT",
                            "startDate": moment(this.ideaRecruitStart).format(),
                            "endDate": moment(this.ideaRecruitEnd).format()
                        },
                        {
                            "periodType": "IDEA_VOTE",
                            "startDate": moment(this.ideaVoteStart).format(),
                            "endDate": moment(this.ideaVoteEnd).format()
                        },
                        {
                            "periodType": "IDEA_CHECK",
                            "startDate": moment(this.ideaSelectCheckStart).format(),
                            "endDate": moment(this.ideaSelectCheckEnd).format()
                        },
                        {
                            "periodType": "TEAM_BUILDING",
                            "startDate": moment(this.teamBuildingDate).format()
                        }
                    ],
                    "sessionNumber": this.$route.params.sessionNumber,
                    "teamBuildingMode": this.teamBuildingSwitch
                };
                putSession({sessionNumber: this.$route.params.sessionNumber, body: JSON.stringify(body)})
                    .then(res => {
                        alert('적용완료!')
                    })
            },
            startDateCheck(value) {
                if (value === 'ideaVote') {
                    let originFormat = moment(this.ideaVoteStart).format();
                    let beforeCompareFormat = moment(this.ideaRecruitEnd).format();
                    let afterCompareFormat = moment(this.ideaVoteEnd).format();

                    if (beforeCompareFormat >= originFormat) {
                        alert('모집기간보다 빠른 날짜를 설정하실 수 없습니다.');
                        let beforeDay = new Date(beforeCompareFormat);
                        beforeDay.setDate(beforeDay.getDate() + 1);
                        this.ideaVoteStart = beforeDay;
                    }
                    if (originFormat >= afterCompareFormat) {
                        alert('종료일보다 클수 없습니다.');
                        let afterDay = new Date(afterCompareFormat);
                        afterDay.setDate(afterDay.getDate() - 1);
                        this.ideaVoteStart = afterDay;
                    }
                } else if (value === 'ideaSelectCheck') {
                    let originFormat = moment(this.ideaSelectCheckStart).format();
                    let beforeCompareFormat = moment(this.ideaVoteEnd).format();
                    let afterCompareFormat = moment(this.ideaSelectCheckEnd).format();

                    if (beforeCompareFormat >= originFormat) {
                        alert('투표기간보다 빠른 날짜를 설정하실 수 없습니다.');
                        let beforeDay = new Date(beforeCompareFormat);
                        beforeDay.setDate(beforeDay.getDate() + 1);
                        this.ideaSelectCheckStart = beforeDay;
                    }
                    if (originFormat >= afterCompareFormat) {
                        alert('종료일보다 클수 없습니다.');
                        let afterDay = new Date(afterCompareFormat);
                        afterDay.setDate(afterDay.getDate() - 1);
                        this.ideaSelectCheckStart = afterDay;
                    }
                }
            },
            endDateCheck(value) {
                if (value === 'ideaRecruit') {
                    let originFormat = moment(this.ideaRecruitEnd).format();
                    let compareFormat = moment(this.ideaRecruitStart).format();

                    if (compareFormat >= originFormat) {
                        alert('시작일보다 작을수 없습니다.');
                        let nextDay = new Date(compareFormat);
                        nextDay.setDate(nextDay.getDate() + 1);
                        this.ideaRecruitEnd = nextDay;
                    }
                } else if (value === 'ideaVote') {
                    let originFormat = moment(this.ideaVoteEnd).format();
                    let compareFormat = moment(this.ideaVoteStart).format();

                    if (compareFormat >= originFormat) {
                        alert('시작일보다 작을수 없습니다.');
                        let nextDay = new Date(compareFormat);
                        nextDay.setDate(nextDay.getDate() + 1);
                        this.ideaVoteEnd = nextDay;
                    }
                } else if (value === 'ideaSelectCheck') {
                    let originFormat = moment(this.ideaSelectCheckEnd).format();
                    let compareFormat = moment(this.ideaSelectCheckStart).format();

                    if (compareFormat >= originFormat) {
                        alert('시작일보다 작을수 없습니다.');
                        let nextDay = new Date(compareFormat);
                        nextDay.setDate(nextDay.getDate() + 1);
                        this.ideaSelectCheckEnd = nextDay;
                    }
                }
            }
        },
        created() {
            this.imageUrl = require('@/assets/logo.png');
            this.loadData();
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
