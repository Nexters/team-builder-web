<template>
    <div class="board">
        <b-form-group>
            <div v-for="idea in ideaListResult" :key="idea.orderNumber">
                <!-- NOTICE -->
                <div v-if="idea['type'] === 'NOTICE'" class="Rectangle list" style="border: solid 1.5px #dbdbdb;">
                    <!-- idea type -->
                    <img src="@/assets/img/NOTICE.png"
                         class="notice"/>
                    <!-- idea-name-->
                    <div class="idea-name notice-title" @click="$emit('goDetail', idea.ideaId)"
                         style="margin-right: 152px;">
                        {{ idea['title'] }}
                    </div>
                    <!-- position -->
                    <div class="position">
                        &nbsp;
                    </div>
                    <!-- author -->
                    <div class="author">
                        {{ idea['author'].name }}
                    </div>
                    <!-- created At -->
                    <div class="created-at">
                        {{ idea['createdAt'] | formatDate }}
                    </div>
                    <!-- vote number-->
                    <div class="vote-number">
                        -
                    </div>
                    <!-- 선정 이미지 -->
                    <div class="selection">&nbsp;-</div>
                </div>
                <!-- IDEA -->
                <div v-else class="Rectangle list">
                    <!-- idea type -->
                    <div style="width: 72px; height: 74px">
                        <div class="custom-checkbox">
                            <b-form-checkbox
                                    :value="idea"
                                    v-model="selected"
                                    @change="toggle"
                                    stacked
                            />
                        </div>
                    </div>
                    <!-- idea-name-->
                    <div class="idea-name" @click="$emit('goDetail', idea.ideaId)">
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
                        {{ idea['createdAt'] | formatDate }}
                    </div>
                    <!-- vote number-->
                    <div class="vote-number">
                        {{ numberFormat(idea['voteNumber']) }}
                    </div>
                    <!-- 선정 이미지 -->
                    <img src="../../../assets/img/selection.png" class="selection" v-show="idea['selected']">
                    <img src="../../../assets/img/non-selection.png" class="selection" v-show="!idea['selected']">
                </div>
            </div>
        </b-form-group>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    import {bus} from '@/main';
    import {ACTIONS, GETTERS} from "@/store/types";
    import {createNamespacedHelpers} from 'vuex';

    const {mapActions, mapGetters, mapState} = createNamespacedHelpers('main');

    export default {
        name: "AdminIdeaList",
        props: ['allSelected', 'select'],

        data() {
            return {
                selected: [],
            }
        },

        methods: {
            positionFormat(position) {
                if (position === 'DEVELOPER') {
                    return '개발자';
                }
                return '디자이너';
            },

            numberFormat(n) {
                return n > 9 ? "" + n : "0" + n;
            },

            toggle(checked) {
                if (checked) {
                    if (this.ideaListResult.length === this.selected.length + 1) {
                        this.$emit('update:allSelected', true);
                    }
                } else {
                    this.$emit('update:allSelected', false);
                }
            },
        },

        mounted() {
            bus.$on('toggleAll', (checked) => {
                let selected = [];
                if (checked) {
                    this.ideaListResult.forEach(function (idea) {
                        if (idea.type !== 'NOTICE') {
                            selected.push(idea);
                        }
                    })
                }
                this.selected = selected;
            }),

                bus.$on('clickSelection', () => {
                    this.$store.dispatch('main/SELECTION_IDEAS', this.selected);
                }),

                bus.$on('clickDeletion', () => {
                    this.$store.dispatch('main/DELETE_IDEAS', this.selected);
                })
        },

        computed: {
            ...mapGetters({
                ideaListResult: GETTERS.GET_LIST,
            }),
        }
    }

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('YYYY.MM.DD')
        }
    })
</script>

<style src="./AdminIdeaList.css" scoped>

</style>
