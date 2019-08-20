<template>
    <div class="board">
        <div v-for="idea in ideaListResult" :key="idea.orderNumber">
            <!-- IDEA -->
            <div class="Rectangle list">
                <!-- idea-name-->
                <div class="idea-name">
                    {{ idea['title'] }}
                </div>
                <!-- position -->
                <div class="position">
                    {{ positionFormat(idea['author'].position) }}
                </div>
                <!-- author -->
                <div class="author">
                    {{ idea['author'].name }}
                </div>
                <!-- created At -->
                <div class="created-at">
                    {{ dateFormat(idea['createdAt']) }}
                </div>
                <!-- 첨부 이미지 -->
                <img src="@/assets/img/attached_file.png" class="attached" v-show="idea['file']">
                <img src="@/assets/img/unattached_file.png" class="attached" v-show="!idea['file']">
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "teamBuildingListDefault"
  }
</script>

<style scoped>

</style>