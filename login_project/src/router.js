import { createRouter, createWebHistory } from 'vue-router'

import MyPage from "./components/MyPage.vue"

const routes = [
    { path: '/mypage', component: MyPage },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})


export default router