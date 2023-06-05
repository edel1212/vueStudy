<template>
    <div>
        <label   label for="idInput">ID :</label>
        <input type="text" id="idInput" name="id">
        
        <br/>
        <label for="pwInput">PW :</label>
        <input type="password" id="pwInput" name="pw">
        <button @click="login">login</button>
  </div>
</template>

<script>
export default {
    name : "loginApp"
}
</script>


<script setup>

    import Axios from "axios";

    import { useRouter } from 'vue-router'

    import {useStore} from 'vuex';

    // Router 객체 생성
    const router = useRouter();
    
    // Store 객체 생성
    const store = useStore();

    const token = sessionStorage.getItem("jwt");
    if(token) router.push("/");



    /**
     * login Event
     */
    const login = (e)=>{
    const id = document.querySelector("#idInput").value;
    const pw = document.querySelector("#pwInput").value;
    console.log(id);
    console.log(pw);
    const form = new FormData();
    form.append("username",id);
    form.append("password",pw);
    Axios.post("http://localhost:8081/user/login"
        ,form)
        .then(result=>{
        const {token} = result.data;
        sessionStorage.setItem("jwt",token);
        store.commit("changeId",id);
        // 페이지 이동
        router.push("/mypage");
        }).catch(error=>{
        console.log(error);
        })
    }

</script>


<style>

</style>