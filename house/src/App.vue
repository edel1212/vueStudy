<template>

  <div class="menue">
    <a v-for="(item,index) in topMenu" :key="index" href="">
        {{item}}[{{index}}]
    </a>
  </div>

  <div class="itemSection" v-for="(item, index) in oneRoomData" :key="index">    
    <img :src="item.image" class="room-img">       
    <h4>{{item.title}}</h4>
    <p>{{item.price}} 만원</p>  
    <p>{{item.content}}</p>
  </div>

  <!-- Modal -->
  <div class="black-bg" v-if="!modalState">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지 내용</p>
      <button @click="this.modalState = false">닫기</button>
    </div>
  </div>

</template>

<script>

import dummyData from "./assets/json/dummyData.js"

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      topMenu : ["Home", "Shop", "About"],
      products : [ {name:"역삼동원룸", reportCnt : 0 }
                 , {name:"천호동원룸", reportCnt : 0 }
                  , {name:"마보구원룸", reportCnt : 0} ],
      modalState : true,
      oneRoomData : dummyData                  
    }
  },
  methods:{   // 함수를 담는곳
    increase(index){
      this.products[index].reportCnt++;
    }
  },
  components: {
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
</style>
