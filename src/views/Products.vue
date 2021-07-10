<template>
  <Loading :active="isLoading"></Loading>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <table class="table align-middle">
        <thead>
          <tr style="text-align: center">
            <th style="width: 200px">圖片</th>
            <th>商品名稱</th>
            <th style="width: 100px">價格</th>
            <th style="width: 250px">動作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 迴圈 -->
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div
                style="
                  border-radius: 5px;
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ 'background-image': `url(${item.imageUrl})` }"
              ></div>
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>
              {{ item.price }}
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :disabled="loadingStatus.loadingItem === item.id"
                  @click="getProduct(item.id)"
                >
                  <div
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    v-if="loadingStatus.loadingItem === item.id"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  :disabled="loadingStatus.loadingItem === item.id"
                  @click="addToCart(item.id)"
                >
                  <div
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    v-if="loadingStatus.loadingItem === item.id"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UserProductModal
    ref="userProductModal"
    :product="product"
    @add-to-cart="addToCart"
  ></UserProductModal>
</template>

<script>
import UserProductModal from "@/components/UserProductModal.vue";

export default {
  name: "Products",
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      isLoading: false,
      products: [],
      product: {},
    };
  },
  components: {
    UserProductModal,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.isLoading = false;
        } else {
          alert(res.data.message);
        }
      });
    },
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.loadingStatus.loadingItem = id;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          console.log(res.data.product);
          this.loadingStatus.loadingItem = "";
          this.product = res.data.product;
          this.isLoading = false;
          this.$refs.userProductModal.openModal();
        } else {
          alert(res.data.message);
        }
      });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.loadingStatus.loadingItem = "";
          this.$refs.userProductModal.hideModal();
          this.isLoading = false;
        } else {
          alert(res.data.message);
        }
      });
    },
  },
};
</script>
