<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li>Next</li>
      <!-- <li>Register</li> -->
    </ul>
    <img src="./assets/logo.png" class="logo" />    
  </div>
  
  <Post v-bind:result="instaArr"/>

  

</template>

<script>

// Post Component import
import Post from "./components/Post.vue"

export default {
  name: 'App',
  components: {
    Post,
  }
}
</script>

<script setup>
  //import Axios from 'axios';
  import {useStore} from 'vuex'
  import { onMounted, ref } from 'vue';

  const store = useStore();
 
  const instaArr = ref(null);
  onMounted(() => {
    store.dispatch("getData");
  });
    
  // Vuex 스토어의 instaArr 상태를 반응형 변수와 연결
  store.watch(() => store.state.instaArr, (newValue) => {
    instaArr.value = newValue;
  });

</script>


<style>
  @import "./assets/css/app.css";  
</style>
