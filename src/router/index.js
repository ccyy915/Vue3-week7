import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Index.vue"),
      },
      {
        path: "/products",
        name: "Products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "/product/:id",
        name: "Product",
        component: () => import("../views/Product.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("../views/Cart.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/Dashboard/Products.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/Dashboard/Orders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
