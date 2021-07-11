<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <button
          class="btn btn-success flex-end"
          @click="openProductModal(true)"
        >
          + NEW
        </button>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.origin_price }}</td>
              <td>{{ item.price }}</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="openProductModal(false, item)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="openDelModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
      </div>
    </div>
    <!-- ProductModal -->
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />
    <!-- DeleteModal -->
    <DelModal :item="tempProduct" ref="delModal" @delete-data="delProduct" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DeleteModal.vue";

export default {
  name: "Products",
  props: ["token"],
  data() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: "",
        delModal: "",
      },
      currentPage: 1,
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ["emitter"],
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      });
    },
    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.productModal;
      productComponent.openModal();
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = "post";
      // let status = "新增產品";
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        method = "put";
        // status = "更新產品";
      }
      const productComponent = this.$refs.productModal;
      this.$http[method](url, { data: this.tempProduct }).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          productComponent.hideModal();
          this.getProducts(this.currentPage);
        } else {
          alert(res.data.message);
        }
      });
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        console.log(res.data);
        alert(res.data.message);
        this.isLoading = false;
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts(this.currentPage);
      });
    },
  },
};
</script>
