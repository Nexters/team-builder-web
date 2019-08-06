<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>개발 편의 Index 페이지</h1>
    <h2>힘냅시다. 미카엘, 봄  :) </h2>

    <router-link to="/">Home</router-link> <br>
    <router-link to="/signup">Signup</router-link> <br>
    <router-link to="/about">About</router-link> <br>
    <router-link to="/example">Example</router-link> <br>
    <router-link to="/editor">Editor</router-link> <br>
    <router-link to="/session">Session</router-link> <br>

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
  }
}
</script>
