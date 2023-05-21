<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img :src="oneRoomData[clickNum].image" >
      <h4>{{oneRoomData[clickNum].title}}</h4>
      <p>{{oneRoomData[clickNum].content}}</p>
      <p>{{oneRoomData[clickNum].price}}</p>
      <!-- props에서 받아온 데이터는 재할당(변경)이 불가능하다 "read-only" -->
      <!-- <button @click="this.modalState = false">닫기</button> -->
    </div>
  </div>
</template>

<script>
export default {
    name: "Modal-Component",
    props:{
      // 받아온 key : 자료형
      oneRoomData : Array,
      clickNum : Number,
      modalState : Boolean
    }
}
</script>

<style>

</style>