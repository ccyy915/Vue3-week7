<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent>LAX Select</a>
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
          <router-link to="/products" class="nav-link">產品列表</router-link>
          <router-link to="/cart" class="nav-link">購物車</router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link to="/admin/products" class="nav-link"
            >管理後台</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
