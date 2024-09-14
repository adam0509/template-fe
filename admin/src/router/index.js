import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../components/Dashboard.vue"),
        },
        {
          path: "/admins",
          name: "admins",
          component: () => import("../components/Admins.vue"),
        },
        {
          path: "/logs",
          name: "logs",
          component: () => import("../components/Logs.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

// Navigation guard to check for token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  if (to.name !== "login" && !token) {
    // If the user is not logged in and trying to access a route other than login
    next({ name: "login" });
  } else {
    next(); // Allow navigation if the user is logged in or trying to access the login page
  }
});

export default router;
