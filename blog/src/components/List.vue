<template>

  <h5 @click="$router.go(-1)">뒤로가기 [숫자에 따라 페이지 개수 지정 가능]</h5>
  <h5 @click="$router.go(1)">앞으로가기 [숫자에 따라 페이지 개수 지정 가능]</h5>

  <div v-for="(item,idx) in blogDataArr" :key="idx">    
    <router-link :to="'/Detail/' + idx">
      <h5>{{item.title}}</h5>
    </router-link>
    
    <!-- route와 다름 router이다 -->    
    <h5 @click="$router.push('/detail/'+idx)">{{item.title}}</h5>
    

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
  
    },
}
</script>

<style>

</style>