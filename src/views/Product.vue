<template>
  <h1>產品細節</h1>
  {{ product.title }}
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      product: {},
    };
  },
  created() {
    const { id } = this.$route.params;
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
    this.$http.get(url).then((res) => {
      if (res.data.success) {
        this.product = res.data.product;
      } else {
        alert(res.data.message);
      }
    });
  },
};
</script>
