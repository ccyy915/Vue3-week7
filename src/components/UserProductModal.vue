<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <span class="badge bg-success me-1">
              {{ product.category }}</span>
          <h5 class="modal-title">{{ product.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img class="img-fluid mb-1" :src="product.imageUrl" />
          <p class="h6">
            商品描述：
            <span class="fw-light">{{ product.description }}</span>
          </p>
          <p class="h6">
            商品內容： <span class="fw-light">{{ product.content }}</span>
          </p>
          <div class="float-end">
            <div class="h5" v-if="!product.price">
              {{ product.origin_price }} 元
            </div>
            <div class="h6" v-if="product.price">
              原價{{ product.origin_price }} 元
            </div>
            <div class="h5" v-if="product.price">
              {{ product.price }} 元
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control"
              v-model.number="qty"
              min="1"
            />
            <button
              type="button"
              class="btn btn-outline-success"
              @click="$emit('add-to-cart', product.id, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      status: {},
      modal: "",
      qty: 1,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: "static",
    });
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
</script>
