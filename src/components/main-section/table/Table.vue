<template>
    <div class="table">
        <div>
            <section>
                전체 아이디어 {{ }}건
            </section>
            <section>
                <div>태그검색</div>
                <div>즐겨찾기만 보기</div>
                <div>
                    <input name="query" v-model="searchQuery" placeholder="검색하기">
                </div>
            </section>
        </div>
        <div>
            <table class="board">
                <thead>
                    <tr>
                        <th v-for="key in columns"></th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="entry in data">
                    <td v-for="key in columns">
                        {{ entry[key] }}
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
    data() {
      return {
        ideas: []
      }
    },
    created() {
      // axios.get()
    }
  }
</script>

<style scoped>

</style>