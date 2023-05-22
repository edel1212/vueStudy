<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img :src="oneRoomData[clickNum].image" >
      <h4>{{oneRoomData[clickNum].title}}</h4>
      <p>{{oneRoomData[clickNum].content}}</p>
      <!-- 
        상단의 코드 축약버전 모든 input, select 등 value를 알아서 바인딩 해줌 
        단 v-model을 사용 시 초기값이 굉장이 중요함! 숫자로하고 한글을 넣으면 바인딩을 못함 당연한것이지만 기억해두자
      -->
      <input type="text" v-model.number = "month" />
      <p> {{month}}개월 선택 :  {{oneRoomData[clickNum].price * month }}</p>

      <!-- props에서 받아온 데이터는 재할당(변경)이 불가능하다 "read-only" -->
      <button @click="modalClose">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "Modal-Component",
    data() {
      return {
        month : 3,
        arr : [1,2],
        str : "가나다",
        obj : {name : "yoo", age : 30},
        bool : false
      }
    },
    props:{
      // 받아온 key : 자료형
      oneRoomData : Array,
      clickNum : Number,
      modalState : Boolean
    },
     
    watch : { // 데이터 감시
      month(param){ 
        if(isNaN(param)){
          alert("숫자를 입력해주세요");
          this.month = 1;
        }
      },
      bool(param){
        console.log(param);
      }
    } ,
    methods : {
      modalClose(){
        this.$emit("modalClose", false);
      }, 
    },
    updated(){
      if(this.month < 2){
        alert("2개월 이상만!");
        this.month = 3;
      }
    }
}
</script>

<style>

</style>