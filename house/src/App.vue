<template>

  <!-- Menue -->
  <div class="menue">
    <a v-for="(item,index) in topMenu" :key="index" href="">
        {{item}}
    </a>
  </div>

  <Discount />

  <!-- Card -->
  <!-- @작명한것="함수 또는 코드" -->
  <Card @openModal="modalEvent($event)" v-for="(item, idx) in oneRoomData" :key="idx"  v-bind:oneRoomData="oneRoomData[idx]" />

  <!-- 등장 애니메이션 효과 -->
  <transition name="fade">
    <Modal v-bind:oneRoomData="oneRoomData" v-bind:clickNum=clickNum v-bind:modalState=modalState @modalClose="modalState = $event" />
  </transition>

</template>

<script>

// Component
import Discount from "./Discount.vue";
import Modal from "./Modal.vue"
import Card from "./Card.vue"

// DummyData
import dummyData from "./assets/json/dummyData.js"

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      topMenu : ["Home", "Shop", "About"],
      modalState : false,
      oneRoomData : dummyData,
      clickNum : 0,                  
    }  
  },
  methods:{   // 함수를 담는곳
    modalEvent (clickNum){
      this.modalState = true;
      this.clickNum = clickNum;
    }
  },
  components: {
    // Discount : Discount
    Discount,
    // Modal
    Modal,
    // Card
    Card,
  }
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
.body{
  margin: 0px;
}
.menue{
  background: darkslateblue;
  padding:15px;
  border-radius: 5px;
}
.menue a {
  color :  white;
  padding : 10px;
}
.itemSection{
  border-bottom: 1px solid black;
}
.room-img{
  /* width: 100%; */
  margin-top: 40px;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
  top : 1px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
.discount{
   background : #eee;
   padding : 10px ;
   margin:10px;
   border-radius : 5px
}
.start{
  opacity: 0;
  transition: all 1s;
}
.end{
  opacity: 1;
}

.fade-enter-from{ /* 시작 */
  transform: translateY(-1000px);
}
.fade-enter-active{
  transition: all .5s;
}
.fade-enter-to{ /* 끝 */
  transform: translateY(0px);
}

.fade-leave-from{ /* 끝 */
  opacity: 1;
}
.fade-leave-active{
  transition: all 1s;
}
.fade-leave-to{ /* 시작 */
  opacity: 0;
}

</style>
