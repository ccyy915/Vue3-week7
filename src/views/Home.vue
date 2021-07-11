<template>
  <UserNavbar />
  <router-view></router-view>
</template>

<script>
import UserNavbar from "@/components/UserNavbar.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { UserNavbar },
};
</script>
