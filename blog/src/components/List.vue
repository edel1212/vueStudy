<template>
  <div>
    <h5>{{blogDataObj.title}}</h5>
    <p>{{blogDataObj.content}}</p>
    <p>{{blogDataObj.date}}</p>
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
        blogDataObj : Object
    }
}
</script>

<style>

</style>