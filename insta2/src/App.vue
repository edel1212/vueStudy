<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="movePage(0)">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="store.state.stepCnt == 0">
        <input @change="imagUpload" accept="image/*" type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">Write</label>
      </li>
      <li v-if="store.state.stepCnt == 1">Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />    
  </div>
  
  <!-- Container Component -->
  <Container v-bind:updateImgURL="updateImgURL"/>

   <!-- Footer -->
  <div class="footer">
    <ul class="footer-button-plus">
      <label class="input-plus">+</label>
    </ul>
 </div>
  
</template>

<script>

// Container Import
import Container from "./components/Container.vue"

export default {
  name: 'App',
  data (){
    return {
    }
  },
  components: {
    Container,
  }
}
</script>

<script setup>

   import {useStore} from 'vuex';
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';

  const store = useStore();
  const router = useRouter();


  /**
   * 페이지 이동
   */
  const movePage = (step)=>{
    store.commit("setStepCnt",step);
     let url = step === 0 ? "/" : "/write";
     store.commit("setStepCnt",step);
     router.push(url);
  }

  /***
   * 이미지 등록 및 이동
   */
  const updateImgURL = ref('');
  const imagUpload = (e)=>{
      const files = e.target.files;
      if(files.length === 0) return;
      for(let file of files){
        if(file.type !== 'image/jpeg') return;        
        updateImgURL.value = URL.createObjectURL(file);
      } 
      movePage(1);
  }

</script>


<style>
  @import "./assets/css/app.css";  
</style>
