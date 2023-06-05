// 👉 설치한 vuex를 import
import { createStore } from 'vuex'
  
// 👉 createStore()를 사용하여 store 생성
const store = createStore({
  state(){
    return {
     // 👉 데이터 추가
      id : ""
    }
  },
  mutations:{
    changeId(state,id){
        state.id = id;
    }
  }
})

// 👉 export store  
export default store