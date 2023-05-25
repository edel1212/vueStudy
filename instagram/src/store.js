import { createStore } from 'vuex';
import axios from 'axios';
import instaDataArr from "./assets/dummyData/dummyData"

const store = createStore({
  state(){
    return {
      name : "kim",
      age : 20,
      likesObj : {
        likeState : false,
        count : 0,        
      },
      more : {},
      instaDataArr
    }
  },

  /**데이터 수정하는 방법 정의 */
  mutations:{
    changeName(state){
        state.name = 'yoojh~!'
    },
    addAge(state, param){
        state.age += param;
    },
    addLike(state){
        let {likeState} = state.likesObj;
        likeState ? state.likesObj.count-- : state.likesObj.count++;
        state.likesObj.likeState = !likeState;
    },
    setMore(state, param){
        state.more = param;
    },
    addInstaDate(state, param){
        state.instaDataArr.push(param);
    },
    publish(state, param){
        state.instaDataArr.unshift(param);
    },
  },
  /** ajax요청을 받는곳 - 비동기 요청을 받는다 */
  actions :{
    getData(contenxt){
        axios.get(`https://codingapple1.github.io/vue/more0.json`)
        .then((res)=>res.data)
        .then((result)=>{
            // 뮤테이션 함수 이용
            contenxt.commit('setMore',result);
            
            console.log(contenxt.rootState);
            console.log(contenxt.state);
        })
    },
    addInstaData(contenxt, parBtnCnt){
      axios.get(`https://codingapple1.github.io/vue/more${parBtnCnt}.json`)
      .then((res)=>res.data)
      .then((result)=>{        
        // Vue는 실시간 재 랜더링을 해주므로 
        // data에 추가만 해주면 된다.        
        contenxt.commit("addInstaDate",result);
      }).catch(err=>{
        console.log(err);
      });
    }
  }

})

export default store