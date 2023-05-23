<template>
  <div v-for="(item,idx) in blogDataArr" :key="idx">
    <router-link to="/Detail">
      <h5>{{item.title}}</h5>
    </router-link>
    
    <p>{{item.content}}</p>
    <p>{{item.date}}</p>    
  </div>
  
</template>

<script>
export default {
    name : "List-Component",
    data(){
        return {

        }
    },
    props :{
        blogDataArr : Array
    },methods :{
  
    }
}
</script>

<style>

</style>