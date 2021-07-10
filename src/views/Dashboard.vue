<template>
  <div id="nav">
    <router-link to="/">回前台</router-link> |
    <router-link to="/admin/products">後台產品列表</router-link> |
    <router-link to="/admin/orders">後台訂單</router-link> |
    <a href="#" @click.prevent="signOut">登出</a>
  </div>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const url = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(url).then((res) => {
          if (res.data.success) {
            this.checkSuccess = true;
          } else {
            alert(res.data.message);
            this.$router.push("/login");
          }
        });
      } else {
        alert("您尚未登入唷> <");
        this.$router.push("/login");
      }
    },
    signOut() {
      document.cookie = "hexToken=;expires=;";
      alert("將為您轉到至登入頁面");
      this.$router.push("/login");
    },
  },
};
</script>
