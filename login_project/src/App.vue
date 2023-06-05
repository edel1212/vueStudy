<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <button @click="logout">logout</button>

  <br/>
  <h1>ID :: {{$store.state.id}}</h1>
  <p>-----------------------</p>
  <router-view></router-view>
  <p>-----------------------</p>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<script setup>

  import { useRouter } from 'vue-router'

  const router = new useRouter();

  const logout = (e)=>{
    sessionStorage.removeItem("jwt");
    router.push("/");
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
