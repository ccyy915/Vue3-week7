<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">LAX Select</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/admin/products" class="nav-link"
            >產品列表</router-link
          >
          <router-link to="/admin/orders" class="nav-link"
            >客戶訂單</router-link
          >
          <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link to="/products" class="nav-link">回前台</router-link>
          <a href="#" @click.prevent="signOut" class="nav-link">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  inject: ["emitter"],
  methods: {
    signOut() {
      document.cookie = "hexToken=;expires=;";
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
