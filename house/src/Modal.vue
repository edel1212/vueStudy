<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img :src="oneRoomData[clickNum].image" >
      <h4>{{oneRoomData[clickNum].title}}</h4>
      <p>{{oneRoomData[clickNum].content}}</p>
      <p>{{oneRoomData[clickNum].price}}</p>
      <button @click="this.modalState = false">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "Modal-Component"
}
</script>

<style>

</style>