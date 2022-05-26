import { createWebHistory, createRouter } from "vue-router";

// Auth page components
const loginPage = () => import("@/views/authentication/LoginPage.vue");
const registerPage = () => import("@/views/authentication/RegisterPage.vue");

// Dashboard page components
const layout = () => import("@/views/dashboard/layouts/Layout.vue");
const createPhonebook = () =>
  import("@/views/dashboard/phonebook/CreatePhonebook.vue");
const UpdatePhonebook = () =>
  import("@/views/dashboard/phonebook/UpdatePhonebook.vue");
const listPhonebook = () =>
  import("@/views/dashboard/phonebook/ListPhonebook.vue");
const UploadExcel = () => import("@/views/dashboard/phonebook/UploadExcel.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { requiresAuth: false },
    component: loginPage,
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresAuth: false },
    component: registerPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { requiresAuth: true },
    component: layout,
    children: [
      {
        path: "phonebooks",
        name: "phonebook-list",
        meta: { requiresAuth: true },
        component: listPhonebook,
      },
      {
        path: "phonebooks/create",
        name: "phonebook-create",
        meta: { requiresAuth: true },
        component: createPhonebook,
      },
      {
        path: "phonebooks/update/:id",
        name: "phonebook-update",
        meta: { requiresAuth: true },
        component: UpdatePhonebook,
      },
      {
        path: "phonebooks/uploads/excel",
        name: "phonebook-upload-excel",
        meta: { requiresAuth: true },
        component: UploadExcel,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // Redirect to dashboarc page if user already login.
  if (!to.meta.requiresAuth && sessionStorage.getItem("token")) {
    return {
      path: "/dashboard/phonebooks",
    };
  }

  // Redirect to login page if user trying to go to dashboard but not login.
  if (to.meta.requiresAuth && !sessionStorage.getItem("token")) {
    return {
      path: "/",
    };
  }
});

export default router;
