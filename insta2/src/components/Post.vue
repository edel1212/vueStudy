<template>
  <div class="post" v-for="(instaData, idx) in propsInsta.result" :key="idx">   
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
  import { defineProps } from 'vue';
  const  propsInsta  = defineProps(['result']);

</script>

<style>
    @import "/src/assets/css/post.css";  
</style>