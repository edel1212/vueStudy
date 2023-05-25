import { createApp } from 'vue'
import App from './App.vue'

// mitt 라이브러리  추가
import mitt from "mitt"

// createApp(App)을 변수로 할당 [상단에 import한 App 추가]
const app = createApp(App);

// npm으로 추가한 mitt을 변수로 생성
const emitter = mitt();

// app의 config -> globalProperties에 추가
app.config.globalProperties.emitter = emitter;

// 기존 사용중이던 createApp(App)를 변수로 변경된것으로 수정
//createApp(App).mount('#app')
app.mount('#app');
