<template>
  <router-view v-bind:updateImgURL="updateImgURL"></router-view>
</template>

<script>
export default {
    name : "appContainer",
    data(){
        return {}
    },
    props:{
      updateImgURL : String
    }
}
</script>

<style>
    @import "/src/assets/css/container.css";  
</style>