// from "" 경로가 아닌 라이브러리명을 기입 시 라이브러리를 불러온다!
import { createWebHistory, createRouter } from "vue-router";

// Router에 import할 component를 추가
import List from "./components/List.vue"
import Home from "./components/Home.vue"

/**
 * path에 맞는 url 접속 시 지정된 component로 이동 시켜준다.
 */
const routes = [
  {
    path: "/list",
    component: List,
  },
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 