  import { createStore } from 'vuex'
  import Axios from 'axios';

  const store = createStore({
    state(){
      return {
        instaArr : null
      }
    },
    mutations:{
      setInstaData(state, param){
        state.instaArr = param;
      }
    }, actions :{
      getData(){
        Axios.get('http://localhost:8081/list')
        .then(result=>{
          store.commit("setInstaData",result.data);
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  })
  
  // 👉 export store  
  export default store