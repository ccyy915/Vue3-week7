<template>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/all";
// 推薦使用 CDN，因為 svg 不一定可以從 node_modules 導出
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
}
</style>
