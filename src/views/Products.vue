<template>
  <Loading :active="isLoading"></Loading>

  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="d-flex flex-wrap justify-content-between">
        <div
          class="card mb-3"
          style="width: 33%"
          v-for="item in products"
          :key="item.id"
        >
          <img
            :src="item.imageUrl"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.price }} 元</p>
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <UserProductModal
    ref="userProductModal"
    :product="product"
    @add-to-cart="addToCart"
  ></UserProductModal>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
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
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    UserProductModal,
    Pagination,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
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
