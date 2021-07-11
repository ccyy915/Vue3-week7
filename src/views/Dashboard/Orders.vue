<template>
  <Loading :active="isLoading"></Loading>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">成立日期</th>
            <th>收件人姓名</th>
            <th width="120">收件人電話</th>
            <th>收件人信箱</th>
            <th width="120">總金額</th>
            <th width="120">是否付款</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ time(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.tel }}</td>
            <td>{{ item.user.email }}</td>
            <td>{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <OrderModal
        :order="tempOrder"
        ref="orderModal"
        @update-paid="updatePaid"
      ></OrderModal>
      <DelModal
        :item="tempOrder"
        ref="delModal"
        @delete-data="delOrder"
      ></DelModal>
      <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import OrderModal from "@/components/OrderModal.vue";
import DelModal from "@/components/DeleteModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Orders",
  props: ["token"],
  data() {
    return {
      idLoading: false,
      orders: {},
      tempOrder: {},
      pagination: {},
      currentPage: 1,
    };
  },
  components: {
    OrderModal,
    DelModal,
    Pagination,
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        }
      });
    },
    time(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD");
    },
    openModal(item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.openModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      const delOrderComponent = this.$refs.delModal;
      delOrderComponent.openModal();
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then(() => {
        const delOrderComponent = this.$refs.delModal;
        delOrderComponent.hideModal();
        this.getOrders(this.currentPage);
      });
    },
    updatePaid(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(url, { data: paid }).then((res) => {
        this.isLoading = false;
        const orderComponent = this.$refs.orderModal;
        orderComponent.hideModal();
        this.getOrders(this.currentPage);
        alert(res.data.message);
      });
    },
  },
};
</script>
