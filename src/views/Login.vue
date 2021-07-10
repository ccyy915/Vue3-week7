<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            id="login-submit"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Login",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(url, this.user).then((res) => {
        console.log(res);
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.$router.push("/admin/products");
        } else {
          alert(res.data.message);
        }
      });
    },
  },
};
</script>
