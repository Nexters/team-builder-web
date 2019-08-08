<template>
    <div class="main-idea-list-wrap">
        <div class="main-idea-contents-wrap">
            <IdeaList></IdeaList>
        </div>
    </div>
</template>

<script>
    import IdeaList from '@/components/idea/list/IdeaList';

    export default {
        name: "IdeaSection",
        components: {
            IdeaList
        },
    }
</script>

<style scoped>
    .main-idea-list-wrap {
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
    }

    .main-idea-contents-wrap {
        width: 1200px;
        min-height: 538px;
    }
</style>