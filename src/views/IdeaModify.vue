<template>
    <Layout>
        <template v-slot:body>
            <div class="new-idea-wrap">
                <IdeaEditor :idea="idea" style="margin-top: 66px;" :selectedTags="selectedTags"></IdeaEditor>

                <div class="tag-group-container">
                    <div class="tag-group-message">저는 이런 팀원이 필요해요</div>
                    <div class="tag-group-message-hint">함께 일하고 싶은 팀원의 포지션을 선택해주세요. 최대 5개 까지의 태그를 선택할 수 있어요. 개발자태그는 그린박스,
                        디자이너태그는 옐로우박스예요.
                    </div>
                    <TagGroup :allTags="allTags" :selectedTags="selectedTags"
                              :fetchSelectedTags="fetchSelectedTags"></TagGroup>
                </div>

                <div v-if="isAvailableFileUpload" class="file-upload-wrap">
                    <div class="file-upload-title-box">
                        <span class="file-upload-title-text">첨부파일</span>
                    </div>
                    <div class="file-upload-message-box">
                        <span class="file-upload-message-text">아이디어 선정자는 발표용 파일을 첨부해주세요.</span>
                    </div>

                    <div v-show="!hasFile" class="file-upload-button-box">
                        <label for="file-upload" class="file-upload-button-label">
                            <span class="file-upload-button-text">파일첨부하기</span>
                        </label>
                        <input id="file-upload" type="file" @change="onFileChange($event)" class="file-upload-button"/>
                    </div>
                    <div v-show="hasFile" class="file-upload-has-file-wrap">
                        <a :href="idea.file" :download="fileName" target="_blank" class="file-upload-has-file-text-box">
                            <span class="file-upload-has-file-text">{{ fileName }}</span>
                        </a>
                        <button @click="removeFile()" class="file-upload-has-file-remove-icon-box">
                            <img src="@/assets/img/cancellation.png" class="file-upload-has-file-remove-icon"/>
                        </button>
                    </div>
                </div>

                <div v-if="isTeamBuildingMode" class="team-member-wrap">
                    <div class="team-member-title">
                        <span class="team-member-text">팀원구성</span>
                        <span class="team-member-count">{{idea.members.length}}</span>
                        <span class="team-member-modify-text">확정된 팀원이 있다면,  팀원을 추가해서 최종으로 구성해주세요.</span>
                    </div>

                    <button @click="teamMemberManagePopupOn" class="team-member-add-button">
                        <span class="team-member-add-button-text">팀원 추가하기</span>
                    </button>
                    <TeamMemberManagerPopup v-show="showTeamMemberManagePopup"
                                            :originMembers="idea.members"
                                            @close="closeTeamMemberManagePopup"
                                            @complete="completeTeamMember"/>

                    <div class="team-member-info">
                        <TeamMemberInfo v-for="member in idea.members" :key="member.id" :member="member"/>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import TagGroup from '@/components/common/tag/TagGroup';
    import IdeaEditor from '@/components/idea/new/IdeaEditor';
    import TeamMemberInfo from '@/components/idea/team/TeamMemberInfo';
    import {ACTIONS, GETTERS} from '@/store/types';
    import {createNamespacedHelpers} from 'vuex';
    import {uploadFiles} from '@/api/FileAPI';
    import {getFileName} from '@/utils/file';
    import {PERIOD_TYPE} from '@/consts/periodType';
    import TeamMemberManagerPopup from '@/components/idea/team/TeamMemberManagerPopup';
    import {putTeamMember} from '@/api/teamBuildingAPI';

    const {mapState, mapActions, mapGetters} = createNamespacedHelpers('main');

    export default {
        name: "IdeaModify",
        components: {TeamMemberManagerPopup, Layout, IdeaEditor, TagGroup, TeamMemberInfo},
        data() {
            return {
                idea: {
                    ideaTitle: '',
                    editorText: '',
                    tags: [],
                },
                selectedTags: [],
                showTeamMemberManagePopup: false
            }
        },

        computed: {
            ...mapState({
                isTeamBuildingMode: state => state.session.teamBuildingMode,
            }),

            ...mapGetters({
                nowPeriodType: GETTERS.GET_PERIOD_TYPE_NOW,
            }),

            allTags() {
                const allTagsCopy = JSON.parse(JSON.stringify(this.$store.state.main.session.tags));
                return allTagsCopy.map(tag => {
                    if (this.idea.tags.find(selectedTag => selectedTag.tagId === tag.tagId)) {
                        return {
                            ...tag,
                            state: true
                        };
                    }
                    return {...tag};
                })
            },

            availableEditIdea() {
                return this.isAdmin || this.isOwner;
            },

            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            isOwner() {
                return this.$store.getters.getUuid === this.idea.author.uuid;
            },

            hasFile() {
                return this.idea.file;
            },

            fileName() {
                return getFileName(this.idea.file);
            },

            isAvailableFileUpload() {
                return this.nowPeriodType === PERIOD_TYPE.IDEA_CHECK || this.nowPeriodType === PERIOD_TYPE.TEAM_BUILDING;
            }
        },

        methods: {
            ...mapActions({
                getIdea: ACTIONS.GET_IDEA,
            }),

            removeFile() {
                this.idea.file = '';
            },

            getIdeaDetail(ideaId) {
                this.getIdea(ideaId)
                    .then(res => {
                        this.idea = {
                            ...res.data,
                            ideaTitle: res.data.title,
                            editorText: res.data.content,
                        };

                        if (!this.availableEditIdea) {
                            this.$store.commit('common/showAlert', {alertMessage: '접근권한이 없어요.'});
                            this.$router.push({path: '/'});
                        }
                    })
                    .catch(err => console.log(err));
            },

            onFileChange(event) {
                uploadFiles(event.target.files[0].name, event.target.files[0], 'idea')
                    .then(fileUrls => {
                        alert('파일 업로드 성공!');
                        this.idea.file = fileUrls[0];
                    })
                    .catch(err => {
                        console.log(err);
                        alert('파일 업로드 실패');
                    });
            },

            fetchSelectedTags(selectedTags) {
                this.selectedTags = selectedTags.slice();
            },


            teamMemberManagePopupOn(event) {
                event.preventDefault();
                this.showTeamMemberManagePopup = true;
            },

            /**
             * 팀원 팝업 취소선택 시
             * @param event
             */
            closeTeamMemberManagePopup() {
                this.showTeamMemberManagePopup = false;
            },

            /**
             * 팀원 팝업 적용하기 선택 시
             */
            completeTeamMember(event, {newMembers}) {
                const uuids = newMembers.map(member => member.uuid);
                putTeamMember({
                    ideaId: this.idea.ideaId,
                    uuids
                })
                .then(() => {
                    this.getIdeaDetail(this.idea.ideaId);
                    this.closeTeamMemberManagePopup();
                    window.vm.$notify.success({
                        title: '팀원 추가',
                        message: '팀원이 추가되었습니다.'
                    });
                })
                .catch(err => {
                    console.log(err);
                    //TODO 이미 팀에 속한사람 추가시 에러처리
                    /**
                     *  "status": 400,
                     "errorCode": 90005,
                     "error": "Bad Request",
                     "message": "error.user.has.team"
                     */
                })
            }
        },

        created() {
            this.getIdeaDetail(this.$route.params.ideaId);
        }
    }
</script>

<style scoped>
    .new-idea-wrap {
        width: 1200px;
        min-height: 837px;
        margin-left: 70px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-container {
        width: 100%;
        margin: 50px 0px 0px 0px;
        display: flex;
        flex-direction: column;
    }

    .tag-group-message {
        width: 217px;
        height: 29px;
        font-size: 20px;
        letter-spacing: 0.5px;
        color: #000000;
    }

    .tag-group-message-hint {
        text-align: left;
        width: 100%;
        height: 20px;
        margin: 4px 0px 40px 0px;
        font-size: 14px;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }

    .file-upload-wrap {
        width: 100%;
        text-align: left;
    }

    .file-upload-title-box {
        width: 72px;
        height: 29px;
    }

    .file-upload-title-text {
        font-family: NotoSansCJKkr;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #000000;
    }

    .file-upload-message-box {
        width: 264px;
        height: 20px;
        margin-top: 4px;
    }

    .file-upload-message-text {
        font-family: NotoSansCJKkr;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }

    .file-upload-button-box {
        width: 280px;
        height: 57px;
        margin-top: 30px;
        border-radius: 6px;
        background-color: #273ea5;
    }

    .file-upload-button-label {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .file-upload-button-text {
        width: 107px;
        height: 29px;
        font-family: NotoSansCJKkr;
        font-size: 20px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.6px;
        color: #ffffff;
    }

    .file-upload-button {
        display: none;
    }

    .file-upload-has-file-wrap {
        width: 280px;
        height: 57px;
        margin-top: 30px;
        border-radius: 6px;
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
        display: flex;
    }

    .file-upload-has-file-text-box {
        width: 177px;
        height: 24px;
        margin: 17px 0px 16px 20px;
    }

    .file-upload-has-file-text {
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.48px;
        color: #000000;
    }

    .file-upload-has-file-remove-icon-box {
        height: 20px;
        width: 20px;
        margin: 16px 16px 21px auto;
    }

    .file-upload-has-file-remove-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }

    .team-member-wrap {
        width: 100%;
        margin-top: 60px;
        margin-bottom: 20px;
        text-align: left;
        position: relative;
    }

    .team-member-title {
        width: 76px;
        height: 29px;
        font-family: NotoSansCJKkr;
        font-size: 20px;
        letter-spacing: -0.6px;
        color: #000000;
        display: inline;
    }

    .team-member-count {
        width: 11px;
        height: 29px;
        margin-left: 16px;
        font-family: NotoSansCJKkr;
        font-size: 20px;
        letter-spacing: -0.6px;
        color: #208b84;
    }

    .team-member-modify-text {
        display: block;
        margin-top: 4px;
        width: 350px;
        height: 20px;
        font-family: NotoSansCJKkr;
        font-size: 14px;
        letter-spacing: -0.42px;
        color: #9b9b9b;
    }

    .team-member-add-button {
        width: 201px;
        height: 58px;
        border-radius: 6px;
        background-color: #273ea5;
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .team-member-add-button-text {
        width: 98px;
        height: 27px;
        font-family: NotoSansCJKkr;
        font-size: 18px;
        letter-spacing: -0.82px;
        text-align: center;
        color: #ffffff;
    }

    .team-member-info {
        margin-top: 42px;
    }

</style>
