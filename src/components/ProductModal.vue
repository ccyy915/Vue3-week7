<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <div class="input-group">
                  <input
                    type="file"
                    class="form-control"
                    id="imageFile"
                    multiple
                    aria-label="Upload"
                    accept=".jpg, .png"
                    ref="imageFile"
                    @change="getImage"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    :disabled="!imgData"
                    type="submit"
                    value="Upload"
                    @click="uploadImage"
                  >
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                    上傳
                  </button>
                </div>
              </div>
              <div class="mb-1">
                <div class="form-group">
                  <label for="imageUrl">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <!-- 多圖上傳 -->
              <div>上傳多張圖片</div>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  v-for="(item, key) in tempProduct.imagesUrl"
                  :key="key"
                  class="mb-2"
                >
                  <label :for="key">圖片網址</label>
                  <div class="row mb-1">
                    <div class="col-md-8">
                      <input
                        :id="key"
                        type="url"
                        v-model="tempProduct.imagesUrl[key]"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-4">
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="tempProduct.imagesUrl.splice(key, 1)"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                  <img :src="item" alt="" class="img-fluid" />
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="tempProduct.imagesUrl.push('')"
                >
                  新增圖片
                </button>
                <!-- 多圖上傳 end -->
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="title">標題</label>
                  <input
                    required
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group col-md-6">
                  <div class="form-check mt-3">
                    <input
                      id="is_enabled"
                      class="form-check-input"
                      v-model="tempProduct.is_enabled"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    required
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input
                    required
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    required
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    required
                    id="price"
                    v-model.number="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  id="description"
                  rows=5
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  id="content"
                  rows=5
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
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
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: {},
      modal: "",
      tempProduct: {},
      imgData: {},
    };
  },
  emits: ["update-product"],
  inject: ["emitter"],
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = "";
      }
    },
  },
  methods: {
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    getImage(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.imgData = formData;
    },
    uploadImage(e) {
      e.preventDefault();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      if (e.target.value === "Upload") {
        this.$http.post(url, this.imgData).then((res) => {
          this.status.fileUploading = false;
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.inageUrl;
            this.$refs.imageFile.value = "";
            if (this.isNew) {
              this.tempProduct.imageUrl = res.data.imageUrl;
            } else {
              this.tempProduct.imageUrl.push(res.data.imageUrl);
            }
          } else {
            alert(res.data.message);
          }
        });
      }
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
