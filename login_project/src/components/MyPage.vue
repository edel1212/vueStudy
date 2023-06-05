<template>
  <h1>로그인 성공</h1>
</template>

<script>
export default {
    name : "MypageApp",
}
</script>


<script setup>
import axios from 'axios';
  
  import { useRouter } from 'vue-router'

  import {useStore} from 'vuex';

  const router = useRouter();
  const store = useStore();

  const token = sessionStorage.getItem("jwt");
  if(!token) router.push("/login");
  

  const id = store.state.id;

  console.log(id);

  axios.get(`http://localhost:8081/member/${id}`,{
  headers : {
    Authorization : token
  }})
  .then(res=>{
    console.log(res.data);
  }).catch(err=>{
    console.log(err);
  })

  console.log(token);

</script>

<style>

</style>