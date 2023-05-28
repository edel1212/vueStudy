import { createWebHistory, createRouter } from "vue-router";

//import Post from "./components/Post.vue"

const routes = [
  {
    // path: "/list",
    // component: Post,
  },
];

// 👉 라우터 객체생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👉 라우터 export
export default router;  