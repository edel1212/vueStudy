import { createApp } from 'vue'
import App from './App.vue'

// Vuex Import
import Stroe from "./store.js"
// Router Import
import Router from "./router.js"

createApp(App)
.use(Stroe)
.use(Router)
.mount('#app')
