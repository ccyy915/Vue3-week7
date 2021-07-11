<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <button class="btn btn-success flex-end" @click="openCouponModal(true)">
          + NEW
        </button>
        <table class="table mt-4">
          <thead>
            <tr>
              <th>名稱</th>
              <th>折扣碼</th>
              <th width="100">百分比</th>
              <th width="120">到期日</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }} %</td>
              <td>{{ time(item.due_date) }}</td>
              <td>
                <span v-if="item.is_enabled === 1" class="text-success"
                  >啟用</span
                >
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="openCouponModal(false, item)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="openDelCouponModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages="pagination" @emit-pages="getCoupons"></Pagination>
        <CouponModal
          :coupon="tempCoupon"
          :is-new="isNew"
          ref="couponModal"
          @update-coupon="updateCoupon"
        />
        <DelModal :item="tempCoupon" ref="delModal" @delete-data="delCoupon" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "@/components/Pagination.vue";
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DeleteModal.vue";

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      pagination: {},
      currentPage: 1,
      isLoading: false,
      isNew: false,
    };
  },
  components: {
    CouponModal,
    DelModal,
    Pagination,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    time(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD");
    },
    getCoupons(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http.get(url).then((res) => {
        console.log(res.data);
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let method = "post";
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        method = "put";
      }
      this.$http[method](url, { data: tempCoupon }).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          alert(res.data.message);
          this.getCoupons(this.currentPage);
          this.$refs.couponModal.hideModal();
        } else {
          alert(res.data.message);
          this.isLoading = false;
        }
      });
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          alert(res.data.message);
          this.$refs.delModal.hideModal();
          this.getCoupons(this.currentPage);
        } else {
          this.isLoading = false;
          alert(res.data.message);
        }
      });
    },
  },
};
</script>
