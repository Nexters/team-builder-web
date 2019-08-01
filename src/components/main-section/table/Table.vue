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
                           v-model="searchQuery"
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
                    <th v-for="{name} in titles">{{ name }}</th>
                    <!--<th>글번호</th>-->
                    <!--<th>아이디어 이름</th>-->
                    <!--<th>태그</th>-->
                    <!--<th>직군</th>-->
                    <!--<th>작성자</th>-->
                    <!--<th>날짜</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="entry in data">
                    <td v-if="starFilter === true">
                        <input type="checkbox"
                               name="star-filter"
                               id="star-filter"
                               class="star"
                               :value="entry"
                               v-model="selected"
                               @change="$emit('selected-change', selected)"
                        />
                    </td>
                    <td v-for="{prop} in titles">{{ item[prop] }}</td>
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
      checkboxFilter: {
        type: Boolean,
        default: true
      },
      itemList: {
        type: Array,
        default: function () {
          return [];
        }
      },
      searchAttrs: {
        type: Array,
        default: function() {
          return [];
        }
      },
      titles: {
        type: Array,
        default: function () {
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
        items: this.itemList,
        searchTerm: "",
        selected: []
      };
    },
    mounted() {
      this.$emit("selected", []);
    },
    created() {
      // axios.get()
    },
    methods: {
      filterData() {
        this.searchTerm = this.searchTerm.toLowerCase();
        if(this.searchTerm === "") {
          this.items = this.itemList;
          return;
        }
        this.items = this.itemList.filter(item =>
            this.searchAttrs.some(search =>
                item[search].toLowerCase().includes(this.searchTerm)
            )
        );
      }
    }
  }
</script>

<style scoped>

</style>