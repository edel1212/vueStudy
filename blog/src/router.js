// from "" 경로가 아닌 라이브러리명을 기입 시 라이브러리를 불러온다!
import { createWebHistory, createRouter } from "vue-router";
//import { createWebHashHistory, createRouter } from "vue-router";

// Router에 import할 component를 추가
import List from "./components/List.vue"
import Home from "./components/Home.vue"
import Detail from "./components/Detail.vue"

// Child Router import
import Author from "./components/Author.vue"
import Comment from "./components/Comment.vue"

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
  {
    path: "/Detail/:id",
    component: Detail,
    children :  [
      // ✅ '/'를 뺴줘여함 상대경로로 해야한다.
      {
        path : "author",
        component : Author
      },
      {
        path : "comment",
        component : Comment
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(),
  routes,
});


export default router; 