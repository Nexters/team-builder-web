<template>
    <button class="position-tag-wrap" :class="wrapClassName" :id="tagId">
        <span class="position-tag-span" :class="spanClassName">{{ name }}</span>
    </button>
</template>

<script>
    import {TAG_TYPE} from '@/consts/Tag';

    export default {
        name: "PositionTag",
        props: {
            tagId: {
                type: Number,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            type: {
                type: String,
                required: true
            },

            state: {
                type: Boolean,
                required: false
            }
        },

        computed: {
            wrapClassName() {
                if (!this.state) {
                    return 'disable-wrap';
                }

                switch (this.type) {
                    case TAG_TYPE.DESIGNER:
                        return 'designer-wrap';
                    case TAG_TYPE.DEVELOPER :
                        return 'developer-wrap';
                }
            },

            spanClassName() {
                if (!this.state) {
                    return 'disable-span';
                }

                switch (this.type) {
                    case TAG_TYPE.DESIGNER:
                        return 'designer-span';
                    case TAG_TYPE.DEVELOPER :
                        return 'developer-span';
                }
            }
        },
    }
</script>

<style scoped>
    .position-tag-wrap {
        width: 150px;
        height: 50px;
        border-radius: 6px;
        margin: 0px 16px 16px 0px;
        display: inline-block;
    }

    .position-tag-span {
        width: 78px;
        height: 27px;
        margin: 12px 36px 11px 36px;
        text-align: center;
        font-size: 18px;
        letter-spacing: -1.13px;
        font-family: NotoSansCJKkr;
    }

    .disable-wrap {
        border: solid 1px #dbdbdb;
        background-color: #ffffff;
    }

    .disable-span {
        color: #4a4a4a;
    }

    .designer-wrap {
        border: solid 1px #ffc36e;
        background-color: #fff4d5;
    }

    .designer-span {
        color: #ff7205;
    }

    .developer-wrap {
        border: solid 1px #a2d3c0;
        background-color: #daf4ea;
    }

    .developer-span {
        color: #208b84;
    }
</style>
