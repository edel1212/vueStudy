<template>
  <div v-for="(item,idx) in blogDataArr" :key="idx">
    <h5>{{item.title}}</h5>
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
    }
}
</script>

<style>

</style>