<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <button
          :disabled="this.cart.carts?.length === 0"
          class="btn btn-outline-danger flex-end mb-3"
          @click="deleteAll()"
        >
          清除購物車
        </button>
        <table class="table align-middle">
          <thead>
            <tr style="text-align: center">
              <th style="width: 100px">刪除</th>
              <th>品名</th>
              <th>數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
              <!-- 判斷 購物車內是否有資料 -->
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                    :disabled="loadingStatus.loadingItem === item.id"
                  >
                    <i
                      class="fas fa-spinner fa-pulse"
                      v-if="loadingStatus.loadingItem === item.id"
                    ></i>
                    x
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <input
                        min="1"
                        type="number"
                        @change="updateCart(item)"
                        :disabled="item.id === loadingStatus.loadingItem"
                        v-model.number="item.qty"
                        class="form-control"
                      />
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{ item.product.price }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cart.total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-md-6">
        <Form v-slot="{ errors }" @submit="submitOrder" ref="form">
          <div class="mb-3">
            <label for="email">E-mail</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入您的 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name">收件人姓名</label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入您的姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="tel">收件人電話</label>
            <Field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入您的電話"
              rules="required|min:8|max:10"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="address">收件人地址</label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入您的地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button
              type="submit"
              class="btn btn-success"
              :disabled="this.cart.carts?.length === 0"
            >
              送出訂單
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon_code: "",
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          this.isLoading = false;
        } else {
          alert(res.data.message);
        }
      });
    },
    removeCartItem(id) {
      this.isLoading = true;
      this.loadingStatus.loadingItem = id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          this.getCart();
        } else {
          alert(res.data.message);
        }
        this.loadingStatus.loadingItem = "loading";
        this.isLoading = false;
      });
    },
    submitOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        console.log(res);
        if (res.data.success) {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      });
    },
    deleteAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url).then((res) => {
        this.isLoading = false;
        alert(res.data.message);
        this.getCart();
      });
    },
  },
};
</script>
