<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="tapStep === 1" @click="tapStep++">Next</li>
      <li v-if="tapStep === 2" @click="publish">Register</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- 
    Comonent를 사용해도 되나 Router를 사용해야하는이유
    - 👉 뒤로가기 버튼 떄문이다. [중요!]
   -->
  <Container v-bind:instaDataArr="instaDataArr" v-bind:tapStep="tapStep"
   v-bind:updateImgURL="updateImgURL" @write="content = $event" v-bind:filter="filter"/>


  <!-- 더보기 버튼 -->
  <button @click="more">더보기</button>

  <!-- Footer -->
  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="imagUpload" accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
 </div>

<div @click="tapClick">
  <button data-idx="0">내용0</button>
  <button data-idx="1">내용1</button>
  <button data-idx="2">내용2</button>
</div>
<div sytle="margin-top:500px"></div>


</template>

<script>

// DummyData import
import instaDataArr from "./assets/dummyData/dummyData"

// Component import
import Container from "./components/Container.vue";

// Axios import
import Axios from "axios";

export default {
  name: 'App',
  data (){
    return {
      instaDataArr,
      btnCnt : 0,
      tapStep : 0,
      updateImgURL : '',
      content : '',
      filter : ''
    }
  },
  components: {
    Container
  },
  methods : {
    /** 더 보기 */
    more(){
      // Btn Count에 따른 URL 변화
      let parBtnCnt = this.btnCnt%2;
      this.btnCnt ++;

      /**
       * Axios에서는 Data을 가져올 경우 .data를 통해 JSON으로 반환 받는다.
       * - fetch 경우 .json()임 차이가 있음 잊지말자
       */
      Axios.get(`https://codingapple1.github.io/vue/more${parBtnCnt}.json`)
      .then((res)=>res.data)
      .then((result)=>{        
        // Vue는 실시간 재 랜더링을 해주므로 
        // data에 추가만 해주면 된다.
        this.instaDataArr.push(result);
      }).catch(err=>{
        console.log(err);
      });
      
    },
    /** 탭버튼 Event */
    tapClick(e){      
      if(e.target.nodeName !== 'BUTTON') return;
      this.tapStep = e.target.dataset.idx;
    },
    /** 파일 업로드 */
    imagUpload(e){
      const files = e.target.files;
      if(files.length === 0) return;

      // 확장자 체크
      for(let file of files){
        if(file.type !== 'image/jpeg') return;        
        this.updateImgURL = URL.createObjectURL(file);
      } 
      // 등록 스탭으로 변경
      this.tapStep = 1;
    },
    /** 글 작성 */
    publish(){
      const registerData = {
        name: "Yoo jh",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.updateImgURL,
        likes: 0,
        date: new Date(),
        liked: false,
        content: this.content,
        filter: this.filter
      };
      // 👉 unshift() << 왼쪽에 데이터를 추가
      this.instaDataArr.unshift(registerData);
      // 스탭 초기화
      this.tapStep = 0;
    }
  },
  mounted(){
    // "내가 지정한 이벤트명"
    this.emitter.on("selectedFilter",(data)=>{
      this.filter = data;
    })
  }
}
</script>

<style>
  body {
    margin: 0;
  }
  ul {
    padding: 5px;
    list-style-type: none;
  }
  .logo {
    width: 22px;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 13px;
  }
  .header {
    width: 100%;
    height: 40px;
    background-color: white;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
  }
  .header-button-left {
    color: skyblue;
    float: left;
    width: 50px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 10px;
  }
  .header-button-right {
    color: skyblue;
    float: right;
    width: 50px;
    cursor: pointer;
    margin-top: 10px;
  }
  .footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    padding-bottom: 10px;
    background-color: white;
  }
  .footer-button-plus {
    width: 80px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    padding-top: 12px;
  }
  .sample-box {
    width: 100%;
    height: 600px;
    background-color: bisque;
  }
  .inputfile {
    display: none;
  }
  .input-plus {
    cursor: pointer;
  }
  #app {
    box-sizing: border-box;
    font-family: "consolas";
    margin-top: 60px;
    width: 100%;
    max-width: 460px;
    margin: auto;
    position: relative;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
</style>
