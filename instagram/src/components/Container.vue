<template>
  <div v-for="(item,idx) in instaDataArr" :key="idx">
    <Post v-bind:instaData="instaDataArr[idx]" />
  </div>
</template>

<script>
import Post from "/src/components/Post.vue"
export default {
    name : "ContainerComponent"
    ,components :{
        Post,
    },
    props : {
        instaDataArr : Array
    }
}
</script>

<style>

</style>