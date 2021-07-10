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
            <th width="100">是否付款</th>
            <!-- <th width="120">編輯</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ time(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <td class="text-end">{{ item.user.tel }}</td>
            <td class="text-end">{{ item.user.email }}</td>
            <td class="text-end">{{ item.total }}</td>
            <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else>未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Orders",
  props: ["token"],
  data() {
    return {
      orders: [],
      idLoading: false,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders;
        } else {
          alert(res.data.message);
        }
        this.isLoading = false;
      });
    },
    time(timestamp) {
      return moment(timestamp * 1000).format("YYYY-MM-DD");
    },
  },
};
</script>
