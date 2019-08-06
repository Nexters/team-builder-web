<!-- TO-DO column별로 정렬 기능 구현 -->
<!-- TO-DO 작성자 검색 기능 구현 -->
<template>
    <div class="card">
        <div class="card-header">
            <section>
                전체 아이디어 {{ ideaList.length }}건
            </section>
            <section>
                <div>
                    <input type="search"
                           class="search-input"
                           v-model="searchTerm"
                           placeholder="검색하기"
                           @keyup="filterData()"
                    >
                </div>
            </section>
        </div>
        <div class="card-body">
            <table class="board">
                <thead>
                <tr>
                    <th v-for="{ name } in titles">{{ name }}</th>
                    <!--<th>즐겨찾기</th>-->
                    <!--<th>글 번호</th>-->
                    <!--<th>아이디어 이름</th>-->
                    <!--<th>태그</th>-->
                    <!--<th>직군</th>-->
                    <!--<th>작성자</th>-->
                    <!--<th>날짜</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="idea in ideaListResult()" :key="idea.orderNumber">
                    <!-- table column의 index, favorite이 0으로 시작 -->
                    <td v-for="(value, index) in titles">
                        <!-- favorite -->
                        <div v-if="index === 0">
                            <input type="checkbox"
                                   name="favorite-filter"
                                   id="favorite-filter"
                                   class="favorite"
                                   :value="idea"
                                   v-model="selected"
                                   @change="select(selected)"
                            />
                        </div>
                        <!-- tags -->
                        <div v-else-if="index === 3">
                            <div v-for="{ name } in idea[value.prop]">
                                {{ name }}
                            </div>
                        </div>
                        <!-- position -->
                        <div v-else-if="index === 4">
                            {{ idea[value.prop].position }}
                        </div>
                        <!-- author -->
                        <div v-else-if="index === 5">
                            {{ idea[value.prop].name }}
                        </div>
                        <div v-else>
                            {{ idea[value.prop] }}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Table",
    model: {
      prop: "checked",
      event: "change"
    },
    props: {
      ideaList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      // searchAttrs: {
      //   type: Array,
      //   default: function () {
      //     return [];
      //   }
      // },
      titles: {
        type: Array,
        default: function() {
          return [
            {
              prop: "",
              name: ""
            }
          ]
        }
      }
    },
    data() {
      return {
        ideas: this.ideaList,
        searchTerm: "",
        selected: []
      };
    },
    // mounted() {
    //   this.$emit("selected", []);
    // },
    // created() {
    //   // axios.get()
    // },
    methods: {
      ideaListResult() {
        return this.ideas;
      },

      filterData() {
        this.searchTerm = this.searchTerm.toLowerCase();
        if(this.searchTerm === "") {
          this.ideas = this.ideaList;
          return;
        }

        this.ideas = this.ideaList.filter(idea => {
            ["title", "name"].some(function (search) {
              if(search === "title") {
                if(idea[search].toLowerCase().includes(this.searchTerm) !== 'undefined') {
                  return true;
                } else {
                  return false;
                }
              } else {
                if(idea[search].name.toLowerCase().includes(this.searchTerm) !== 'undefined') {
                  return true;
                } else {
                  return false;
                }
              }
            })
        }

            // if (idea.title.)
        //   ["title", "author"].some(function (search) {
        //     if(search === "title") {
        //       idea[search].toLowerCase().includes(this.searchTerm)
        //     } else {
        //       idea[search].name.toLowerCase().includes(this.searchTerm)
        //     }
        //   })
        // );
        //     ["title"].some(search =>
        //       idea[search].toLowerCase().includes(this.searchTerm)
        //     )
        );
        console.log(this.ideas);
      },

      select(ideas) {
        this.ideas = ideas;
        console.log(ideas);
      }
    }
  };
</script>

<style scoped>
    section {
        display: inline;
    }

</style>