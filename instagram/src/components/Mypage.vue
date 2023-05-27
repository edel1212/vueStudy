<template>
<div style="padding : 10px">
  <h4>팔로워</h4>
  <input placeholder="?" />
  <div class="post-header" v-for="(item,idx) in follower" :key="idx">
    <div class="profile" :style="`background-image : url(${item.image})`"></div>
    <span class="profile-name">{{item.name}}</span>
  </div>  
  {{follower.value}}
</div>
</template>

<script>

import {computed, onMounted, reactive, ref} from 'vue';
// vuex 사용을 위함
import {useStore} from 'vuex'
import axios from 'axios';

export default {
    name : "myPage",
    // 첫번째 파라미터는 항상 props 임
    // 2개까지 들어감 2번쨰꺼는 에러등이 들어있음
    setup(){

         // 마운디드 사용 하고싶다면
        onMounted(()=>{
             axios.get("/follower.json")
            .then(res => {
                console.log(res.data);
                // ref()로 감싸진 변수에 값을 할당하고 싶다면
                // .value를 붙여줘야햔ㄷ.
                follower.value = res.data;
                console.log(res.data);
                })
        })

        // ref()안에 무조건 넣어줘야함 모든 데이터 전부다.
        // 사용 이유는 실시간 재렌더링 떄문임 
        // vue에서 실시간 렌더링이 가능한 이유는 reference Data 때문이다.

        // 둘의 차이점은 ref : 기본형 변수
        // reactive : 참조형 변수가 들어간다
        // 사실 차이가 없음 에러가 안남
        let follower = ref([]);
        let test = reactive({name : "yoo"});

        console.log(test);

        // computed 사용법
        let result = computed(()=>{
            return follower.value.length;
        })

        // vuex의 state 접근 방법
        let store = useStore(); // $store 와 같음
        console.log(store);
        console.log(store.state.name);
        //store.state.commit;
        //store.state.dispatch;

        // 사용 하고싶다면 return 필요
        return {follower,result};
    }
}
</script>


<style scoped>
/* scoped를 사용하면 해당 vue 파일에만 적용이된다. */
</style>