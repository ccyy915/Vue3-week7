<template>
  <Navbar/>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: "Dashboard",
  data() {
    return {
      checkSuccess: false,
    };
  },
  components: { Navbar },
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
