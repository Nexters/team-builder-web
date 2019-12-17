<template>
    <div class="position-tag-wrap" :class="wrapClassName">
        <div class="tag-name" :class="nameClassName">
            {{ name }}
        </div>
    </div>
</template>

<script>
  import {TAG_TYPE} from '@/consts/Tag';
  export default {
    name: "TableTag",

    props: {
      name: {
        type: String,
        required: true
      },

      type: {
        type: String,
        required: true
      },
    },

    computed: {
      wrapClassName() {
        switch (this.type) {
          case TAG_TYPE.DESIGNER:
            return 'designer-wrap';
          case TAG_TYPE.DEVELOPER :
            return 'developer-wrap';
        }
      },

      nameClassName() {
        switch (this.type) {
          case TAG_TYPE.DESIGNER:
            return 'designer-name-span';
          case TAG_TYPE.DEVELOPER :
            return 'developer-name-span';
        }
      }
    }
  }
</script>

<style scoped>
    .position-tag-wrap {
        width: 97px;
        height: 40px;
        text-align: center;
        margin-right: 9px;
        border-radius: 6px;
        display: inline-block;
        vertical-align: center;
        padding: 8px 15px;
    }

    .designer-wrap {
        background-color: #fff4d5;
    }

    .developer-wrap {
        background-color: #daf4ea;
    }

    .tag-name {
        width: 69px;
        height: 24px;
        font-family: NotoSansCJKkr;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -1px;
    }

    .designer-name-span {
        color: #ff7205;
    }

    .developer-name-span {
        color: #208b84;
    }

</style>