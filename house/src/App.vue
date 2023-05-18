<template>

  <div class="menue">
    <!-- <a v-for="item in 3" :key="item" href="">home</a> -->
    <a v-for="(item,index) in topMenu" :key="index" href="">
        {{item}}[{{index}}]
    </a>
  </div>

  <div>
    <!-- <h4 :id="idTest" :style="styleTest">xxx 원룸</h4> -->
    <h4>xxx 원룸</h4>
    <!-- <p>{{ price1 }} 만원</p> -->
    <p>10 만원</p>
  </div>

  <div class="itemSection" v-for="(item, index) in products" :key="index">
    <h4>{{item.name}}</h4>
    <p>{{(index+1) *10}} 만원</p>  
    <!-- <button @click="reportCnt++">허위매물 신고</button> <span>신고수 : {{reportCnt}}</span> -->
    <button @click="item.reportCnt++">허위매물 신고</button> <span>신고수 : {{item.reportCnt}}</span>
    <!-- <button @mouseover="reportCnt++">허위매물 신고</button> <span>신고수 : {{reportCnt}}</span> -->
  </div>

</template>

<script>

export default {
  name: 'App',
  data(){     // 데이터를 담는 곳
    return {
      topMenu : ["Home", "Shop", "About"],
      products : [ {name:"역삼동원룸", reportCnt : 0 }
                 , {name:"천호동원룸", reportCnt : 0 }
                  , {name:"마보구원룸", reportCnt : 0 } ]      
    }
  },
  methods:{   // 함수를 담는곳
    increase(){
      this.reportCnt++;
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
</style>
