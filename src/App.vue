<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/example">Example</router-link> |
      <router-link to="/editor">Editor</router-link> |
    </div>
    <router-view/>
    <mysidebar/>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
