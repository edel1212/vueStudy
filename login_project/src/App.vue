<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <br/>

  <label for="idInput">ID :</label>
  <input type="text" id="idInput" name="id">
  
  <br/>
  <label for="pwInput">PW :</label>
  <input type="password" id="pwInput" name="pw">
  <button @click="login(event)">login</button>

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

/**
 * login Event
 */
const login = (e)=>{
  const id = document.querySelector("#idInput").value;
  const pw = document.querySelector("#pwInput").value;
  console.log(id);
  console.log(pw);
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
