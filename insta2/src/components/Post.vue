<template>
  <div class="post" v-for="(instaData, idx) in instaArr" :key="idx">   
      <div class="post-header">
        <div class="profile" :style="{'background-image' : `url(${instaData.userImage})`}"></div>
        <span class="profile-name">{{instaData.name}}</span>
      </div>
      <div @click="addLike"  class="post-body" :style="{'background-image' : `url('${instaData.postImage}')`}"></div>
      <div class="post-content">
        <p>{{instaData.likes}} Likes</p>
        <p><strong>{{instaData.name}}</strong> {{instaData.content}}</p>
        <p class="date">{{instaData.date}}</p>
      </div>      
  </div> 
</template>

<script>
export default {
    name : "postComponent",
}
</script>

<script setup>
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
    @import "/src/assets/css/post.css";  
</style>