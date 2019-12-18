<template>
    <Layout>
        <template v-slot:session-info>
            <Session></Session>
        </template>
        <template v-slot:body>

            <div style="width: 1200px; margin-left: 70px;">
                <div class="user-manage-tab d-flex" style="margin-top: 25px">
                    <p>선정 아이디어 {{ideas.length}}건</p>
                    <div class="ml-auto" style="height: 52px;">
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

                            <table class="board" v-for="idea in ideas">
                                <tbody>
                                <tr class="list">
                                    <td>
                                        <div class="row align-items-center"
                                             style="width: 100%; height: 74px; margin-left: 20px">
                                            <div class="row-item" @click="detailIdea({ideaId: idea.ideaId})"
                                                 style="width: 553px; cursor: pointer;">
                                                {{idea.title}}
                                            </div>
                                            <div class="row row-item"
                                                 style="width: 337px; height: 40px; margin: 17px 0px;">
                                                <div v-show="idea['tags'].length === 0" class="not-select-tags">
                                                    태그를 선택하지 않았어요.
                                                </div>
                                                <div v-show="idea['tags'].length > 0" class="tags"
                                                     v-for="(element, index) in idea['tags']"
                                                     v-if="index < 3" v-on:mouseover="viewAllTags"
                                                     v-on:mouseout="closeAllTags">
                                                    <table-tag
                                                            :name="element.name"
                                                            :type="element.type">
                                                    </table-tag>
                                                </div>
                                                <table-tag-pop-up
                                                        style="display: none; right: 290px"
                                                        v-if="idea['tags'].length > 3"
                                                        :all-tags="idea['tags']">
                                                </table-tag-pop-up>
                                            </div>
                                            <div class="row-item" style="width: 66px; margin: 25px 0">
                                                {{getPositionName(idea.author.position)}}
                                            </div>
                                            <div class="row-item" style="width: 66px">
                                                {{idea.author.name}}
                                            </div>
                                            <div class="row-item" style="width: 90px">
                                                {{createdAtAsFormat({createdAt: idea.createdAt})}}
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

                                        <div style="width: 100%;height: 1px;border: .5px solid #eeeeee;"></div>

                                        <div style="width: 100%">
                                            <div class="row align-items-center" v-if="idea.members.length === 0"
                                                 style="margin-left: 20px">
                                                <div class="row row-item align-items-center"
                                                     style="width: 498px; height: 59px">
                                                    팀원 <p style="margin-left: 10px; color: #ff5000">
                                                    {{idea.members.length}}</p>
                                                </div>
                                                <div class="row-item-no-have-team">
                                                    아직 팀원이 구성되지 못했어요
                                                </div>
                                            </div>
                                            <div class="align-items-center" v-else style="margin-left: 20px">
                                                <div class="row row-item align-items-center"
                                                     style="width: 498px; height: 59px">
                                                    팀원 <p style="margin-left: 10px; color: #ff5000">
                                                    {{idea.members.length}}</p>
                                                </div>
                                                <div class="row row-item" style="width: 100%; min-height: 86px">
                                                    <div v-for="member in idea.members" class="team-member-box">
                                                        <div class="team-member-box-header">
                                                            {{memberInfoText({member})}}
                                                        </div>
                                                        <div v-if="member.id.length <= idMaxSize"
                                                             class="team-member-box-body">
                                                            {{member.id}}
                                                        </div>
                                                        <div v-else class="team-member-box-body">
                                                            {{member.id.substr(0, idMaxSize)}}...
                                                        </div>
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
    import {getPositionName} from '@/consts/positionType';
    import moment from 'moment';
    import {getSession} from '@/api/sessionApi';
    import TableTag from "@/components/common/tag/TableTag";
    import TableTagPopUp from "@/components/common/tag/TableTagPopUp";
    import {ID_MAX_SIZE, NAME_MAX_SIZE} from "@/consts/OverLengthDefine";

    export default {
        name: "TeamBuildingManage",
        components: {TableTagPopUp, TableTag, Session, Layout},

        data() {
            return {
                idMaxSize: ID_MAX_SIZE,
                nameMaxSize: NAME_MAX_SIZE,
                /**
                 * 선정된 아이디어 목록
                 */
                ideas: [{
                    ideaId: 0,
                    sessionId: 0,
                    title: '',
                    content: '',
                    author: {
                        uuid: '',
                        id: '',
                        name: '',
                        nextersNumber: 0,
                        position: '',
                    },
                    selected: false,
                    type: 'IDEA',
                    tags: [{
                        name: '',
                        type: ''
                    }],
                    favorite: false,
                    voteNumber: 0,
                    createdAt: null,
                    updatedAt: null,
                    members: [{
                        id: '',
                        name: '',
                        nextersNumber: 0,
                        position: ''
                    }]
                }]
            }
        },

        computed: {},

        methods: {
            getPositionName(position) {
                return getPositionName(position);
            },

            createdAtAsFormat({createdAt}) {
                return moment(createdAt).format('YYYY.MM.DD');
            },

            memberInfoText({member}) {
                return member.name.length <= this.nameMaxSize ?
                    `${member.nextersNumber}기  ${getPositionName(member.position)}  ${member.name}` :
                    `${member.nextersNumber}기  ${getPositionName(member.position)}  ${member.name.substr(0, this.nameMaxSize)}...`;
            },

            detailIdea({ideaId}) {
                this.$router.push({
                    path: `/session/${this.$store.state.main.session.sessionNumber}/idea/${ideaId}`,
                    query: {mode: 'team-building'}
                });
            },

            viewAllTags(event) {
                const popUp = event.target.closest('.row').lastChild;
                if (popUp.className) {
                    popUp.style.display = 'flex';
                }
            },

            closeAllTags(event) {
                const popUp = event.target.closest('.row').lastChild;
                if (popUp.className) {
                    popUp.style.display = 'none';
                }
            },
        },

        created() {
            getSession({sessionNumber: this.$store.state.main.session.sessionNumber})
                .then(res => {
                    this.ideas = res.data.ideas.filter(idea => {
                        return idea.selected;
                    });

                    this.ideas.forEach(idea => {
                        // Search writer index
                        let writerIdx = -1;
                        for (let i = 0; i < idea.members.length; i++) {
                            if (idea.members[i].uuid === idea.author.uuid) {
                                writerIdx = i;
                                break;
                            }
                        }

                        // Move index
                        idea.members.splice(0, 0, idea.members.splice(writerIdx, 1)[0]);
                    });
                })
                .catch(err => console.log(err)); //TODO: 아이디어 목록을 불러오지 못했습니다.
        }
    }
</script>

<style src="./TeamBuildingManage.css" scoped/>
