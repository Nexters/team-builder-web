<template>
    <div class="card">
        <div class="card-header">
            <section>
                전체 아이디어 {{ }}건
            </section>
            <section>
                <div>태그검색</div>
                <div>즐겨찾기만 보기</div>
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
                    <th v-if="starFilter === true">즐겨찾기</th>
                    <th v-for="{ name } in titles">{{ name }}</th>
                    <!--<th>글번호</th>-->
                    <!--<th>아이디어 이름</th>-->
                    <!--<th>태그</th>-->
                    <!--<th>직군</th>-->
                    <!--<th>작성자</th>-->
                    <!--<th>날짜</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="idea in ideaListResult()" :key="idea.id">
                    <td v-if="starFilter === true">
                        <input type="checkbox"
                               name="star-filter"
                               id="star-filter"
                               class="star"
                               :value="idea"
                               v-model="selected"
                               @change="select(selected)"
                        />
                    </td>
                    <td v-for="{ prop } in titles">{{ idea[prop] }}</td>
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
      starFilter: {
        type: Boolean,
        default: true
      },
      ideaList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      searchAttrs: {
        type: Array,
        default: function () {
          return [];
        }
      },
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
        console.log("come in");
        this.searchTerm = this.searchTerm.toLowerCase();
        console.log("검색어 " + this.searchTerm);
        if(this.searchTerm === "") {
          this.ideas = this.ideaList;
          return;
        }

        console.log("not returned");
        this.ideas = this.ideaList.filter(idea =>
            this.searchAttrs.some(search =>
                idea[search].toLowerCase().includes(this.searchTerm)
            )
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