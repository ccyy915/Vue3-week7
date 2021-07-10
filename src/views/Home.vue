<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/admin/products">管理後台</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
