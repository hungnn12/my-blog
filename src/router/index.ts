import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: () => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: "/blogs" };
    },

    children: [
      {
        path: "/blogs",
        name: "blogsList",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/BlogsListView.vue"),
      },
      {
        path: "/add",
        name: "addBlog",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AddBlogView.vue"),
      },
    ],
  },

  {
    path: "/blog/detail/:id",
    name: "blogDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BlogDetailView.vue"),
  },
  {
    path: "/blog/edit/:id",
    name: "blogEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditBlogView.vue"),
  },
  // and finally the default route, when none of the above matches:
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
