import { createWebHistory, createRouter } from "vue-router";

import Post from "./components/Post.vue";
import Write from "./components/Write.vue";

const routes = [
  {
     path: "/",
     component: Post,
  },
  {
    path: "/write",
    component: Write,
 },
];

// 👉 라우터 객체생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});


// 👉 라우터 export
export default router;  