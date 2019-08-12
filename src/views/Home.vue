<template>
  <div class="home">
    <img style="margin-top: 100px; width: 300px" src="../assets/img/moimmoim_icon.png">
    <br><br><br>
    <h1>Develop Index</h1>
    <h2>😎👊🤔👍👥💪 파이팅 - @미카엘 @봄</h2>

    <router-link v-for="route in routes" :to="route.path"><b>{{route.name}}</b><br></router-link>
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      routes: this.$router.options.routes,
    }
  }
}
</script>
