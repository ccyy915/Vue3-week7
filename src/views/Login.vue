<template>
  <div
    class="position-relative w-100 min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80');
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
      background-position: 50%;
      opacity: 0.7;
    "
  >
    <div
      class="position-relative d-flex justify-content-center align-items-center vh-100"
    >
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
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
              class="btn btn-outline-dark w-100 mt-3"
              type="submit"
              id="login-submit"
            >
              登入
            </button>
          </form>
        </div>
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
