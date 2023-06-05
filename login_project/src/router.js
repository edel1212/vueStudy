import { createRouter, createWebHistory } from 'vue-router'

import MyPage from "./components/MyPage.vue"
import Login from "./components/Login.vue"

const routes = [
    { path: '/mypage', component: MyPage },
    { path: '/login', component: Login },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})


export default router