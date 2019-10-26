<template>
    <Layout>
        <template v-slot:session-info>
            <Session></Session>
        </template>
        <template v-slot:body>

            <div style="width: 1200px; margin-left: 70px;">
                <div class="user-manage-tab d-flex" style="margin-top: 25px">
                    <p>선정 아이디어 5건</p>
                    <div class="ml-auto">
                        <input type="search"
                               class="search-box"
                               placeholder="제목과 작성자를 검색해주세요."
                               v-on:input="search = $event.target.value"
                               @keyup="filtering()">
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <b-form-group>
                            <div class="titles">
                                <div class="title" style="width: 573px; padding-left: 20px">
                                    아이디어 명
                                </div>
                                <div class="title" style="width: 337px">태그</div>
                                <div class="title" style="width: 66px">직군</div>
                                <div class="title" style="width: 66px">작성자</div>
                                <div class="title" style="width: 90px">날짜</div>
                                <div class="title" style="width: 64px">선정여부</div>
                            </div>

                            <table class="board">
                                <tbody>
                                <tr class="list">
                                    <td style="width: 100%">
                                        <div class="row align-items-center"
                                             style="width: 100%; height: 74px; margin-left: 20px">
                                            <div class="row-item" style="width: 553px">
                                                아이디어 12341234
                                            </div>
                                            <div class="row row-item" style="width: 337px">
                                                <div class="card justify-content-center" :class="wrapClassName('DESIGNER')">
                                                    개자이너
                                                </div>
                                                <div class="card justify-content-center" :class="wrapClassName('DEVELOPER')">
                                                    모임모임
                                                </div>
                                            </div>
                                            <div class="row-item" style="width: 66px">
                                                개발자
                                            </div>
                                            <div class="row-item" style="width: 66px">
                                                이름
                                            </div>
                                            <div class="row-item" style="width: 90px">
                                                날짜
                                            </div>
                                            <div class="row-item" style="width: 68px">
                                                <div v-if="true">
                                                    <img src="@/assets/img/selection.png" width="45px" height="29px"/>
                                                </div>
                                                <div v-else>
                                                    <img src="@/assets/img/non-selection.png" width="45px"
                                                         height="29px"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div style="width: 100%; height: 1px; border: solid 1px #dbdbdb"></div>

                                        <div style="width: 100%">
                                            <div class="row align-items-center" v-if="false" style="margin-left: 20px">
                                                <div class="row row-item align-items-center"
                                                     style="width: 498px; height: 59px">
                                                    팀원 <p style="margin-left: 10px; color: #ff5000">0</p>
                                                </div>
                                                <div class="row-item-no-have-team">
                                                    아직 팀원이 구성되지 못했어요
                                                </div>
                                            </div>
                                            <div class="align-items-center" v-else style="margin-left: 20px">
                                                <div class="row row-item align-items-center"
                                                     style="width: 498px; height: 59px">
                                                    팀원 <p style="margin-left: 10px; color: #ff5000">2</p>
                                                </div>
                                                <div class="row row-item" style="width: 100%; height: 86px">
                                                    <div class="team-member-box">
                                                        <div class="team-member-box-header">15기 디자이너 네에글자</div>
                                                        <div class="team-member-box-body">아이디아이디아이디</div>
                                                    </div>
                                                    <div class="team-member-box">
                                                        <div class="team-member-box-header">15기 디자이너 네에글자</div>
                                                        <div class="team-member-box-body">아이디아이디아이디</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>


                                </tr>
                                </tbody>
                            </table>
                        </b-form-group>
                    </div>
                </div>
            </div>
        </template>

    </Layout>
</template>

<script>
    import Layout from "../../components/common/layout/Layout";
    import Session from "../../components/admin/manage/Session";
    import {TAG_TYPE} from "../../consts/Tag";

    export default {
        name: "TeamBuildingManage",
        components: {Session, Layout},
        methods: {
            wrapClassName(type) {
                switch (type) {
                    case TAG_TYPE.DESIGNER:
                        return 'designer-wrap';
                    case TAG_TYPE.DEVELOPER :
                        return 'developer-wrap';
                }
            }
        }
    }
</script>

<style src="./TeamBuildingManage.css" scoped>

</style>
