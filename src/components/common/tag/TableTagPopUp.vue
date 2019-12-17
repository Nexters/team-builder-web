<template>
    <div class="tag-popUp">
        <div class="tags" v-for="(element) in allTags">
            <table-tag
                    :name="element.name"
                    :type="element.type">
            </table-tag>
        </div>
    </div>
</template>

<script>
  import TableTag from "@/components/common/tag/TableTag";
  export default {
    name: "TableTagPopUp",
    components: {TableTag},
    props: {
      allTags: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
    .tag-popUp {
        float: right;
        width: auto;
        height: 74px;
        border-radius: 6px;
        box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
        background-color: #ffffff;
        right: 10px;
        display: none;
        padding: 17px 10px;
        position: relative;
        z-index: 2;
    }

    .tags {
        display: inline-block;
        margin: 0 6px;
        float: left;
    }

</style>