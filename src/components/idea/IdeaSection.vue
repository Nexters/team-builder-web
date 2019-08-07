<template>
    <div class="main-idea-list-wrap">
        <!--<Table :titles="titles" :idea-list="ideaList" :favorite-filter=true>-->
            <!--:search-attrs="searchAttrs" -->
        <IdeaList></IdeaList>
    </div>
</template>

<script>
    // 데이터 형식, 임시 데이터
    // const titles = [
    //     {
    //         prop: "favorite",
    //         name: "즐겨찾기"
    //     },
    //     {
    //         prop: "orderNumber",
    //         name: "글 번호"
    //     },
    //     {
    //         prop: "title",
    //         name: "아이디어 명"
    //     },
    //     {
    //         prop: "tags",
    //         name: "태그"
    //     },
    //     {
    //         prop: "author",
    //         name: "직군"
    //     },
    //     {
    //         prop: "author",
    //         name: "작성자"
    //     },
    //     {
    //         prop: "createdAt",
    //         name: "날짜"
    //     }
    // ];

    // const ideaList = [
    //     {
    //         id: 1,
    //         //content: "",
    //         //file: "",
    //         selected : true,
    //         type: 'IDEA',
    //         orderNumber: 1,
    //         favorite: true,
    //         title: "title",
    //         tags: [
    //             {
    //                 id: 1,
    //                 name: "서버 개발자",
    //                 type: 'DEVELOPER'
    //             }
    //         ],
    //         author: {
    //             name: "origin",
    //             nextersNumber : 13,
    //             position: "개발자"
    //         },
    //         createdAt: "2019-01-01 11:11:11",
    //         updatedAt: "2019-01-01 11:11:11"
    //     }
    // ];

    import IdeaList from '@/components/idea/IdeaList';

    export default {
        name: "IdeaSection",
        components: {
            IdeaList
        },
        // data() {
        //     return {
        //         titles,
        //         ideaList,
        //         // searchAttrs: ["title", "author"]
        //     }
        // }
    }
</script>

<style scoped>
    .main-idea-list-wrap {
        height: 100%;
        background-color: #f5f5f5;
    }
</style>