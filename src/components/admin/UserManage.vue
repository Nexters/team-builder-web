<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <div class="card">
                <div class="card-header">
                    <section class="header-left">
                        <div class="list-info">전체 아이디어 {{ ideaListLength }}건</div>
                        |
                        <div class="star on">즐겨찾기만 보기</div>
                        <!-- click on event -->
                        <!--<div class="all">전체 아이디어 보기</div>-->
                        <!--</div>-->
                    </section>
                    <section class="header-right">
                        <div class="search">
                            <button class="Rectangle-Copy"><span>태그검색</span></button>
                            <input type="search"
                                   class="search-input Rectangle"
                                   v-on:input="searchTerm = $event.target.value"
                                   placeholder="제목과 작성자를 검색해주세요."
                                   @keyup="filterData()"
                            />
                        </div>
                    </section>
                </div>
                <div class="card-body">
                    <div class="titles">
                        <!--<div class="title" :id="{ index }" v-for="(value, index) in titles">{{ value.name }}</div>-->
                        <input type="checkbox" class="title" style="width: 5%;"/>
                        <div class="title" style="width: 5%">가입기수</div>
                        <div class="title" style="width: 10%">직군</div>
                        <div class="title" style="width: 10%">이름</div>
                        <div class="title" style="width: 25%">아이디</div>
                        <div class="title" style="width: 15%">아이디어 작성여부</div>
                        <div class="title" style="width: 15%">아이디어 투표여부</div>
                        <div class="title" style="width: 15%">팀빌딩 여부</div>
                    </div>


                    <table class="board">
                        <tbody>
                        <tr class="Rectangle list" v-for="user in users" :key="user.id">
                            <td style="padding-top: 26px; padding-bottom: 25px; width: 58px">
                                <input type="checkbox" class="title" style="width: 5%;"/>
                            </td>
                            <!-- order-number -->
                            <td style="padding: 29px 0; width: 49px">
                                <div class="order-number">
                                    {{ user['phone'] }}
                                </div>
                            </td>
                            <!-- idea-name-->
                            <td style="padding: 25px 0; width: 476px;">
                                <div class="idea-name">
                                    {{ user['email'] }}
                                </div>
                            </td>
                            <!-- position -->
                            <td style="padding: 25px 0; width: 67px">
                                <div class="position">
                                    {{ user['email'] }}
                                </div>
                            </td>
                            <!-- author -->
                            <td style="padding: 25px 0; width: 56px;">
                                <div class="author">
                                    {{ user['email'] }}
                                </div>
                            </td>
                            <!-- created At -->
                            <td style="padding: 26px 18px 26px 0; width: 108px;">
                                <div class="created-at">
                                    {{ user['email'] }}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        props: ['users'],
        data() {
            return {
                sortPositionASC: false,
                sortDateASC: false,
                ideaListLength: 3
            }
        }
    }
</script>

<style src="./UserManage.css" scoped>
</style>
