import { createApp } from 'vue'
import App from './App.vue'

// Add Bootstrap 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Router import
import router from "./router"

createApp(App)
.use(router)
.mount('#app')
